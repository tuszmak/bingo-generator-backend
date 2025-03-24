import { randomUUID } from "crypto";
import { db } from "../database.js";

export async function findTableById(id: string) {
  return await db
    .selectFrom("BingoTable")
    .where("code", "=", id)
    .selectAll()
    .fullJoin("PackDetails", "BingoTable.id", "PackDetails.id")
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

export async function createTableDetails(
  likes: string[],
  uploadedBy: string,
  bingoTableId: number
) {
  return await db
    .insertInto("TableDetails")
    .values({
      likes,
      uploadedBy,
      bingoTableId,
    })
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getAllTables() {
  return await db
    .selectFrom("BingoTable")
    .selectAll()
    .fullJoin("PackDetails", "BingoTable.id", "PackDetails.id")
    .execute();
}
