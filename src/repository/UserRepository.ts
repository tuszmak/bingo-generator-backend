import type { User } from "@clerk/backend";
import { db } from "../database.js";
import { UserNotFoundError } from "../errors/userErrors.js";
import { clerkClient } from "../index.js";

export async function createUserToDb(user: User) {
  return await db
    .insertInto("DBUser")
    .values({
      userId: user.id,
    })
    .executeTakeFirstOrThrow();
}

export const getUserFromDb = async (userId: string) => {
  const user = await db
    .selectFrom("DBUser")
    .where("DBUser.userId", "=", userId)
    .selectAll()
    .executeTakeFirstOrThrow(
      () => new UserNotFoundError(`No user found with id: ${userId}`)
    );
  const likedPacks = await db
    .selectFrom("LikesOnPacks")
    .where("userId", "=", userId)
    .select("packId")
    .execute();
  return { user, likedPacks };
};

export const modifyUser = async (
  userId: string,
  username?: string,
  email?: string
) => {
  const user = await clerkClient.users.getUser(userId);
  if (email) {
    const oldEmailId = user.primaryEmailAddressId;
    if (oldEmailId) {
      const emailAddress = (
        await clerkClient.emailAddresses.getEmailAddress(oldEmailId)
      ).emailAddress;
      if (email !== emailAddress) {
        await clerkClient.emailAddresses.createEmailAddress({
          userId: userId,
          emailAddress: email,
          primary: true,
          verified: true,
        });
        await clerkClient.emailAddresses.deleteEmailAddress(oldEmailId);
      }
    }
  }
  if (username) {
    await clerkClient.users.updateUser(userId, { username });
  }
};

export const deleteUser = async (userId: string) => {
  await clerkClient.users.deleteUser(userId);
};
