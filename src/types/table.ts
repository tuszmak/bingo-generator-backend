import type { Insertable } from "kysely";
import { z } from "zod";
import type { BingoTable } from "../db/types.js";

export interface Table {
  content: string;
  name: string;
}

export type NewBingoTable = Insertable<BingoTable>;

//Potential extension of the table. Export when applicable.

interface TableRatings {
  likes: number;
  submittedBy: string; //Actually this is a Username
}

export const TableReqSchema = z.object({
  content: z.string(),
  name: z.string(),
});
