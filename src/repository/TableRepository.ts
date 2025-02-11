import { db } from "../database.js";

export async function findTableById(id: number) {
  return await db
    .selectFrom("Bingo_table")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function createTable(content: string) {
  return await db
    .insertInto("Bingo_table")
    .values({ content })
    .returningAll()
    .executeTakeFirstOrThrow();
}
