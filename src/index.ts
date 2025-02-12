import { serve } from "@hono/node-server";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import { createTable, findTableById } from "./repository/TableRepository.js";
import type { TableDAO } from "./types/table.js";

dotenvFlow.config();
const app = new Hono();

app.get("/api/table/:id", async (c) => {
  const id = c.req.param("id");
  const idAsNumber = parseInt(id);
  if (idAsNumber) {
    const table = await findTableById(idAsNumber);
    if (table) {
      return c.body(JSON.stringify(table));
    } else {
      return c.notFound();
    }
  }
});

app.post("api/table", async (c) => {
  const requestData: string = await c.req.json();
  const newTable: TableDAO = await createTable(requestData);
  c.status(201);
  return c.text(`Finished with id ${newTable.id}`);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
