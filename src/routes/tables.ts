import { clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import type { ZodType } from "zod";
import {
  DetailsNotFoundError,
  TableNotFoundError,
} from "../errors/likeErrors.js";
import { mergeTableData } from "../service/tableService.js";
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
  const tablesWithLikes = await Promise.all(
    tables.map((table) => mergeTableData(table))
  );
  if (tables) {
    return c.body(JSON.stringify(tablesWithLikes));
  }
});

tables.get("/:tableID", async (c) => {
  const id = c.req.param("tableID");
  if (id) {
    const table = await findTableById(id);
    if (table) {
      const responseData = await mergeTableData(table);
      return c.body(JSON.stringify(responseData), 200);
    } else {
      return c.notFound();
    }
  }
  return c.text("Table ID is required", 400);
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

tables.post("/like", async (c) => {
  const request = await c.req.json();
  const { userId, packId, state } = LikeReqSchema.parse(request);
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
    if (error instanceof TableNotFoundError) {
      return c.text(`No table found with name ${packId}`, 400);
    }
    if (error instanceof DetailsNotFoundError) {
      return c.text(`No details found for table named ${packId}`, 400);
    }
    if (error instanceof Error) {
      return c.text(error.message, 400);
    }
  }
});

export default tables;
