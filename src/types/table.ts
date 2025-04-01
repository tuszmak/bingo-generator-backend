import { z } from "zod";

export interface Table {
  content: string;
  name: string;
}

//Potential extension of the table. Export when applicable.

export interface TableDetails {
  likes?: string[];
  uploadedByUserId: string;
}

export const TableReqSchema = z.object({
  content: z.string(),
  name: z.string(),
  uploadedByUserId: z.string(),
  likes: z.array(z.string()),
});

export const LikeReqSchema = z.object({
  userId: z.string(),
  state: z.boolean(),
  packId: z.number(),
});
