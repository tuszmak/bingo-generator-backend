import type { UserJSON } from "@clerk/backend";
import { db } from "../database.js";
import { UserNotFoundError } from "../errors/userErrors.js";

export async function createUserToDb(user: UserJSON) {
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
