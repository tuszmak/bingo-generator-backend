/*
  Warnings:

  - The primary key for the `PackDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BingoTableId` on the `PackDetails` table. All the data in the column will be lost.
  - You are about to drop the column `foo` on the `PackDetails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `PackDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `PackDetails` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PackDetails" DROP CONSTRAINT "PackDetails_BingoTableId_fkey";

-- DropIndex
DROP INDEX "PackDetails_BingoTableId_key";

-- AlterTable
ALTER TABLE "PackDetails" DROP CONSTRAINT "PackDetails_pkey",
DROP COLUMN "BingoTableId",
DROP COLUMN "foo",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT NOT NULL DEFAULT 'Foobar',
ADD COLUMN     "id" INTEGER NOT NULL,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "PackDetails_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PackDetails_id_key" ON "PackDetails"("id");

-- AddForeignKey
ALTER TABLE "PackDetails" ADD CONSTRAINT "PackDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "BingoTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
