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
  modifyTable,
} from "./../repository/TableRepository.js";
import {
  LikeReqSchema,
  ModifyTableSchema,
  TableIdList,
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
  const idAsNumber = parseInt(id);
  if (isNaN(idAsNumber)) {
    return c.text("This id is not a number", 400);
  }
  if (idAsNumber) {
    const table = await findTableById(idAsNumber);
    if (table) {
      const responseData = await mergeTableData(table);
      return c.body(JSON.stringify(responseData));
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

tables.post("/getTables", async (c) => {
  const ids = await c.req.json();
  const vaildatedIds = TableIdList.parse(ids);
  const tables = await findTableById(vaildatedIds);
  const tablesWithLikes = await Promise.all(
    tables.map((table) => mergeTableData(table))
  );
  return c.json(tablesWithLikes);
});

tables.patch(
  "/:tableID",
  defaultJsonValidatorFactory(ModifyTableSchema),
  async (c) => {
    const tableID = c.req.param("tableID");
    const idAsNumber = parseInt(tableID);
    if (isNaN(idAsNumber)) {
      return c.text("This id is not a number", 400);
    }
    const { content, name } = c.req.valid("json");
    modifyTable(idAsNumber, content, name);
    return c.text("Success!", 200);
  }
);

export default tables;
