import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UserNotFoundError } from "../errors/userErrors.js";
import { getUser } from "../service/userService.js";
import { getUserReqSchema } from "../types/user.js";

const users = new Hono();

/** This endpoint uses the Clerk ID for the user */
users.get("/:userId", zValidator("param", getUserReqSchema), async (c) => {
  const { userId } = c.req.valid("param");
  try {
    const user = await getUser(userId);
    return c.json(user);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return c.text(error.message, 404);
    }
  }
});

export default users;
