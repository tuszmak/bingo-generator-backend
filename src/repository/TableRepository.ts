import { randomUUID } from "crypto";
import { db } from "../database.js";

export async function findTableById(id: string) {
  return await db
    .selectFrom("BingoTable")
    .where("code", "=", id)
    .selectAll()
    .fullJoin("PackDetails", "BingoTable.id", "PackDetails.bingoTableId")
    .executeTakeFirst();
}

export async function createTable(content: string, name: string) {
  const table = await db
    .insertInto("BingoTable")
    .values({ content: content, code: randomUUID(), name: name })
    .returningAll()
    .executeTakeFirstOrThrow();
  return table;
}

export async function createTableDetails(
  likes: string[],
  uploadedBy: string,
  bingoTableId: number
) {
  return await db
    .insertInto("PackDetails")
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
    .fullJoin("PackDetails", "BingoTable.id", "PackDetails.bingoTableId")
    .execute();
}
