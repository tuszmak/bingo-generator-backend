import { serve } from "@hono/node-server";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import { PostgresDialect } from "kysely";
import pg from "pg";
const { Pool } = pg;

dotenvFlow.config();
const app = new Hono();

const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  }),
});

app.get("/api/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/table/:id", (c) => {
  //TODO get specific table from DB.
  console.log(c.req.param("id"));
  return c.text("foo");
});

app.post("api/table", async (c) => {
  const requestData = await c.req.json();
  console.log(requestData);

  // requestData.
  // createTable(content);
  return c.text("foo");
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
