import { z } from "zod";

export type EventType = "user.created" | "user.updated" | "user.deleted";

export const UserReqSchema = z.object({
  userId: z.string(),
});
