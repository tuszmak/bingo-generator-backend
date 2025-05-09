import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { UserNotFoundError } from "../errors/userErrors.js";
import {
  deleteUserFromClerk,
  getUser,
  updateUser,
} from "../service/userService.js";
import { UserReqSchema } from "../types/user.js";

const users = new Hono();

// prefix: /users

/** This endpoint uses the Clerk ID for the user */
users.get("/:userId", zValidator("param", UserReqSchema), async (c) => {
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

users.patch("/:userId", zValidator("param", UserReqSchema), async (c) => {
  const { userId } = c.req.valid("param");
  const { username, email } = (await c.req.json()) satisfies {
    username: string;
    email: string;
  };
  const { success, message } = await updateUser(userId, username, email);
  if (!success) {
    return c.text("An error happened", 400);
  }
  return c.text(`User updated with id ${userId}`, 200);
});

users.delete("/:userId", zValidator("param", UserReqSchema), async (c) => {
  const { userId } = c.req.valid("param");
  const { success, message } = await deleteUserFromClerk(userId);
  if (!success) {
    return c.text("An error happened", 400);
  }
  return c.text(`User deleted with id ${userId}`, 200);
});

export default users;
