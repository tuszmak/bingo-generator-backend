/*
  Warnings:

  - Added the required column `foo` to the `BingoTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BingoTable" ADD COLUMN     "foo" TEXT NOT NULL;
