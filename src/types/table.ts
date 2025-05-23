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

export const TableIdList = z.array(z.number());

export interface TableInDB {
  code: string;
  id: number;
  name: string;
  content: string;
}

export const ModifyTableSchema = z.object({
  name: z.string().optional(),
  content: z.string().optional(),
});
