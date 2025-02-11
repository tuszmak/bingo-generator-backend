import DotenvFlow from "dotenv-flow";
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import type { DB } from "./db/types.js";
const { Pool } = pg;

DotenvFlow.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
