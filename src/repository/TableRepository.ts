import { randomUUID } from "crypto";
import { db } from "../database.js";
import {
  NoDetailsFoundError,
  NoTableFoundError,
} from "../errors/likeErrors.js";

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

export async function likeTable(
  username: string,
  packName: string,
  state: boolean
) {
  const table = await db
    .selectFrom("BingoTable")
    .where("BingoTable.name", "=", packName)
    .selectAll()
    .executeTakeFirstOrThrow(
      () => new NoTableFoundError(`No table named ${packName}`)
    );

  const detailsToBeModified = await db
    .selectFrom("PackDetails")
    .where("PackDetails.bingoTableId", "=", table.id)
    .selectAll()
    .executeTakeFirstOrThrow(
      () => new NoDetailsFoundError(`No details found for table ${table.name}`)
    );

  const newLikesArray = [...detailsToBeModified.likes];
  if (!state) {
    newLikesArray.splice(newLikesArray.findIndex((name) => name === username));
  } else {
    newLikesArray.push(username);
  }

  return await db
    .updateTable("PackDetails")
    .set({
      likes: newLikesArray,
    })
    .where("packDetailsId", "=", detailsToBeModified.packDetailsId)
    .executeTakeFirstOrThrow();
}
