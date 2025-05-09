import type { User } from "@clerk/backend";
import {
  createUserToDb,
  deleteUser,
  getUserFromDb,
  modifyUser,
} from "../repository/UserRepository.js";
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
  const user = await getUserFromDb(userId);
  const packIds = user.likedPacks.map((pack) => pack.packId);
  return { userId: user.user.userId, packIds };
};

export const updateUser = async (
  userId: string,
  username: string,
  email: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    await modifyUser(userId, username, email);
    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return { success: false, message: "Some kind of error happened" };
  }
};

export const deleteUserFromClerk = async (userId: string) => {
  try {
    await deleteUser(userId);
    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return { success: false, message: "Some kind of error happened" };
  }
};
