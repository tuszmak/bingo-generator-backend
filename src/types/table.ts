import { z } from "zod";

export interface Table {
  content: string;
  name: string;
  userName?: string;
}

export const TableReqSchema = z.object({
  content: z.string(),
  name: z.string(),
});
