import { createClerkClient } from "@clerk/backend";
import { serve } from "@hono/node-server";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import clerk from "./routes/clerk.js";
import tables from "./routes/tables.js";
import users from "./routes/users.js";

dotenvFlow.config();
export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

const app = new Hono()
  .basePath("/api/v1/")
  .route("/table", tables)
  .route("/clerk", clerk)
  .route("/users", users);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
