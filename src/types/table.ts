import { z } from "zod";

export interface Table {
  content: string;
  name: string;
}

export interface TableDAO extends Table {
  id: number;
  code: string;
}

//Potential extension of the table. Export when applicable.

interface TableRatings {
  likes: number;
  submittedBy: string; //Actually this is a Username
}

export const TableReqSchema = z.object({
  content: z.string(),
  name: z.string(),
});
