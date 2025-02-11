import { db } from "../database.js";

export async function findTableById(id: number) {
  return await db
    .selectFrom("Table")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function createTable(content: string) {
  return await db
    .insertInto("Table")
    .values({ content })
    .returningAll()
    .executeTakeFirstOrThrow();
}
