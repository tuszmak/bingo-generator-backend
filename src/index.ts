import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import dotenvFlow from "dotenv-flow";
import { Hono } from "hono";
import { createTable, findTableById } from "./repository/TableRepository.js";
import {
  TableReqSchema,
  type NewBingoTable,
  type Table,
} from "./types/table.js";

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

app.post(
  "api/table",
  zValidator("json", TableReqSchema, (result, c) => {
    if (!result.success) {
      c.text("Invalid data!", 400);
    }
  }),
  async (c) => {
    const req = c.req.valid("json");
    const { content, name }: Table = req;
    const newTable: NewBingoTable = await createTable(content, name);
    c.status(201);
    return c.text(`Finished with id ${newTable.id}`);
  }
);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
