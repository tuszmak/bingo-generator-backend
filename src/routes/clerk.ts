import type { User } from "@clerk/backend";
import { clerkMiddleware } from "@hono/clerk-auth";
import { Hono } from "hono";
import { Webhook, WebhookVerificationError } from "svix";
import { handleUser } from "../service/userService.js";
import type { EventType } from "../types/user.js";

type ClerkWebhookPayload<T> = {
  data: T;
  object: "event";
  type: EventType;
  timestamp: number;
  instance_id: string;
};

const clerk = new Hono();
clerk.use("*", clerkMiddleware());

clerk.post("/", async (c) => {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env"
    );
  }
  const wh = new Webhook(SIGNING_SECRET);

  const svix_id = c.req.header("svix-id");
  const svix_timestamp = c.req.header("svix-timestamp");
  const svix_signature = c.req.header("svix-signature");

  const payload = await c.req.json();

  let evt;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If verification fails, error out and return error code
  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id as string,
      "svix-timestamp": svix_timestamp as string,
      "svix-signature": svix_signature as string,
    }) as ClerkWebhookPayload<User>;
    console.log(evt);
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      console.log("Error: Could not verify webhook:", err.message);
      c.status(400);

      return c.json({
        success: false,
        message: err.message,
      });
    }
  }
  if (evt) {
    handleUser(evt.data, evt.timestamp, evt.type);
    return c.text("ok", 200);
  }

  return c.text(
    `Somehow an event went through the security check, without it having anything.
     Please contact the developer`,
    418
  );
});

export default clerk;
