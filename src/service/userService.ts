import type { UserJSON, WebhookEvent } from "@clerk/backend";
import { createUserToDb, getUserFromDb } from "../repository/UserRepository.js";

export const handleUser = (event: WebhookEvent) => {
  switch (event.type) {
    case "user.created":
      return createUser(event.data);
    case "user.updated":
      break;
    case "user.deleted":
      break;
    default:
      break;
  }
};

async function createUser(user: UserJSON) {
  const userFromDb = await createUserToDb(user);
  return `User created with id ${userFromDb.insertId}`;
}

export const getUser = async (userId: string) => {
  const user = await getUserFromDb(userId);
  const packIds = user.likedPacks.map((pack) => pack.packId);
  return { userId: user.user.userId, packIds };
};
