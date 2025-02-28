import { db } from "../database.js";

export const getPackDetails = async (id: string) => {
  const pack = await db
    .selectFrom("BingoTable")
    .where("code", "=", id)
    .selectAll()
    .executeTakeFirst();
  if (pack) {
    return db
      .selectFrom("PackDetails")
      .where("id", "=", pack.id)
      .selectAll()
      .executeTakeFirst();
  }
};
