import { serve } from "@hono/node-server";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import tables from "./routes/tables.js";

dotenvFlow.config();
const app = new Hono().route("/api/v1/table", tables);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
