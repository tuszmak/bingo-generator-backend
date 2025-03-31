import { clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { ZodType } from "zod";
import {
  NoDetailsFoundError,
  NoTableFoundError,
} from "../errors/likeErrors.js";
import {
  createTable,
  createTableDetails,
  findTableById,
  getAllTables,
  likeTable,
} from "./../repository/TableRepository.js";
import {
  LikeReqSchema,
  TableReqSchema,
  type Table,
  type TableDetails,
} from "./../types/table.js";

const tables = new Hono();
tables.use("*", clerkMiddleware());

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
      return c.body(JSON.stringify(table));
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
  const { content, name, uploadedByUserId }: Table & TableDetails = req;
  const newTable = await createTable(content, name);
  const newDetails = await createTableDetails(uploadedByUserId, newTable.id);
  c.status(201);
  return c.text(`Finished with id ${newTable.id}`);
});

tables.post("/like", defaultJsonValidatorFactory(LikeReqSchema), async (c) => {
  console.log(c);

  const { userId, packId, state } = c.req.valid("json");
  try {
    await likeTable(userId, packId, state);
    if (!state) {
      return c.text(
        `Finished updating ${packId} with removing ${userId} from the like list`
      );
    }
    return c.text(
      `Finished updating ${packId} with adding ${userId} to the like list`
    );
  } catch (error: unknown) {
    if (error instanceof NoTableFoundError) {
      return c.text(`No table found with name ${packId}`, 404);
    }
    if (error instanceof NoDetailsFoundError) {
      return c.text(`No details found for table named ${packId}`, 404);
    }
    return c.text(`Foobar`, 404);
  }
});

export default tables;
