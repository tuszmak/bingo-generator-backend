import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Bingo_table = {
    id: Generated<number>;
    code: string;
    name: Generated<string>;
    content: string;
};
export type DB = {
    Bingo_table: Bingo_table;
};
