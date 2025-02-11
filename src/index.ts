import { serve } from "@hono/node-server";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import postgres from "postgres";

dotenvFlow.config();
const app = new Hono();

const sql = postgres({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
});

app.get("/api/", (c) => {
  return c.text("Hello Hono!");
});

app.get("api/init", async (c) => {
  //TODO this endpoint inits the db tables.
  const result = await sql`SELECT 1 + 1`;
  console.log(result);
  return c.text("foo");
});

app.get("/api/board/:id", (c) => {
  //TODO get specific table from DB.
  console.log(c.req.param("id"));
  return c.text("foo");
});

app.post("api/board", (c) => {
  //TODO Board creator
  return c.text("foo");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
