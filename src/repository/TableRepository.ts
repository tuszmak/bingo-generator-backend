import { randomUUID } from "crypto";
import { db } from "../database.js";

export async function findTableById(id: number) {
  return await db
    .selectFrom("Bingo_table")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function createTable(content: string, name: string) {
  return await db
    .insertInto("Bingo_table")
    .values({ content: content, code: randomUUID(), name: name })
    .returningAll()
    .executeTakeFirstOrThrow();
}
