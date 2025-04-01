import type { User } from "@clerk/backend";
import { db } from "../database.js";

export async function createUserToDb(user: User) {
  return await db
    .insertInto("DBUser")
    .values({
      userId: user.id,
    })
    .executeTakeFirstOrThrow();
}
