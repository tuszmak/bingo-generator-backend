import { randomUUID } from "crypto";
import { db } from "../database.js";

export async function findTableById(id: string) {
  return await db
    .selectFrom("BingoTable")
    .where("code", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function createTable(content: string, name: string) {
  return await db
    .insertInto("BingoTable")
    .values({ content: content, code: randomUUID(), name: name })
    .returningAll()
    .executeTakeFirstOrThrow();
}
