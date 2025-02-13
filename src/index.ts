import { serve } from "@hono/node-server";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import { createTable, findTableById } from "./repository/TableRepository.js";
import type { Table, TableDAO } from "./types/table.js";

dotenvFlow.config();
const app = new Hono();

app.get("/api/table/:id", async (c) => {
  const id = c.req.param("id");
  if (id) {
    const table = await findTableById(id);
    if (table) {
      return c.body(JSON.stringify(table));
    } else {
      return c.notFound();
    }
  }
});

app.post("api/table", async (c) => {
  const { content, name }: Table = await c.req.json();
  const newTable: TableDAO = await createTable(content, name);
  c.status(201);
  return c.text(`Finished with id ${newTable.id}`);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
