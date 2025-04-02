import { z } from "zod";

export type EventType = "user.created" | "user.updated" | "user.deleted";

export const getUserReqSchema = z.object({
  userId: z.string(),
});
