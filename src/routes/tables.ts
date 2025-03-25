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
  const { content, name, likes, submittedBy }: Table & TableDetails = req;
  const newTable = await createTable(content, name);
  const newDetails = await createTableDetails(likes, submittedBy, newTable.id);
  c.status(201);
  return c.text(`Finished with id ${newTable.id}`);
});

tables.post(
  "/like",
  defaultJsonValidatorFactory(LikeReqSchema),
  async (c, next) => {
    const { email, packName, state } = c.req.valid("json");
    try {
      await likeTable(email, packName, state);
      if (!state) {
        return c.text(
          `Finished updating ${packName} with removing ${email} from the like list`
        );
      }
      return c.text(
        `Finished updating ${packName} with adding ${email} to the like list`
      );
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof NoTableFoundError) {
        return c.text(`No table found with name ${packName}`, 404);
      }
      if (error instanceof NoDetailsFoundError) {
        return c.text(`No details found for table named ${packName}`, 404);
      }
      return c.text(`Foobar`, 404);
    }
  }
);

export default tables;
