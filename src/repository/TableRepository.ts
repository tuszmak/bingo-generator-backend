import { randomUUID } from "crypto";
import { db } from "../database.js";

export async function findTableById(id: string) {
  return await db
    .selectFrom("BingoTable")
    .where("code", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function createTable(
  content: string,
  name: string,
  userName?: string
) {
  const table = await db
    .insertInto("BingoTable")
    .values({ content: content, code: randomUUID(), name: name })
    .returningAll()
    .executeTakeFirstOrThrow();
  const details = await db
    .insertInto("PackDetails")
    .values({ id: table.id, createdBy: userName })
    .returningAll()
    .executeTakeFirstOrThrow();
  return { ...table, details };
}

export async function getAllTables() {
  return await db
    .selectFrom("BingoTable")
    .selectAll()
    .fullJoin("PackDetails", "BingoTable.id", "PackDetails.id")
    .execute();
}
