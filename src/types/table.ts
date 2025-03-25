import { z } from "zod";

export interface Table {
  content: string;
  name: string;
}

//Potential extension of the table. Export when applicable.

export interface TableDetails {
  likes: string[];
  submittedBy: string;
}

export const TableReqSchema = z.object({
  content: z.string(),
  name: z.string(),
  submittedBy: z.string(),
  likes: z.array(z.string()),
});

export const LikeReqSchema = z.object({
  email: z.string(),
  state: z.boolean(),
  packName: z.string(),
});
