import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { ZodType } from "zod";
import {
  createTable,
  findTableById,
  getAllTables,
} from "./../repository/TableRepository.js";
import { TableReqSchema, type Table } from "./../types/table.js";

const tables = new Hono();

tables.get("/", async (c) => {
  const tables = await getAllTables();
  if (tables) {
    return c.body(JSON.stringify(tables));
  }
});

tables.get("/:id", async (c) => {
  const id = c.req.param("id");
  if (id) {
    const table = await findTableById(id);
    if (table) {
      return c.body(JSON.stringify({ ...table }));
    } else {
      return c.notFound();
    }
  }
});

const defaultJsonValidatorFactory = <T extends ZodType>(schema: T) =>
  zValidator("json", schema, (result, c) => {
    if (!result.success) {
      c.text("Invalid data!", 400);
    }
  });

tables.post("/", defaultJsonValidatorFactory(TableReqSchema), async (c) => {
  const req = c.req.valid("json");
  const { content, name, userName }: Table = req;
  const newTable = await createTable(content, name, userName);
  c.status(201);
  return c.text(`Finished with id ${newTable.id}`);
});

export default tables;
