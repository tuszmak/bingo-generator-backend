import { randomUUID } from "crypto";
import { db } from "../database.js";

export async function findTableById(id: string) {
  return await db
    .selectFrom("BingoTable")
    .where("code", "=", id)
    .selectAll()
    .fullJoin("PackDetails", "BingoTable.id", "PackDetails.bingoTableId")
    .executeTakeFirstOrThrow();
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
  uploadedByUserId: string,
  bingoTableId: number
) {
  return await db
    .insertInto("PackDetails")
    .values({
      uploadedByUserId,
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

export async function likeTable(
  userId: string,
  packId: number,
  state: boolean
) {
  if (!state) {
    await db
      .deleteFrom("LikesOnPacks")
      .where("userId", "=", userId)
      .where("packId", "=", packId)
      .executeTakeFirstOrThrow();
  } else {
    await db
      .insertInto("LikesOnPacks")
      .values({
        packId: packId,
        userId: userId,
      })
      .executeTakeFirstOrThrow(
        () => new Error("Something went wrong with adding a like")
      );
  }
}

export async function getLikeCountOnTable(packId: number) {
  return await db
    .selectFrom("LikesOnPacks")
    .select(({ fn }) => [
      fn.count<number>("LikesOnPacks.userId").as("likeCount"),
    ])
    .where("LikesOnPacks.packId", "=", packId)
    .executeTakeFirstOrThrow();
}
