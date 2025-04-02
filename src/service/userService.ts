import type { User } from "@clerk/backend";
import { createUserToDb, getUserFromDb } from "../repository/UserRepository.js";
import type { EventType } from "../types/user.js";

export const handleUser = (user: User, timestamp: number, type: EventType) => {
  switch (type) {
    case "user.created":
      createUser(user);
      break;
    case "user.updated":
      break;
    case "user.deleted":
      break;
    default:
      break;
  }
};

async function createUser(user: User) {
  const userFromDb = await createUserToDb(user);
  return `User created with id ${userFromDb.insertId}`;
}

export const getUser = async (userId: string) => {
  return await getUserFromDb(userId);
};
