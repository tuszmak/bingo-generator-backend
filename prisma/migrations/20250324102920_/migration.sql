/*
  Warnings:

  - You are about to drop the `PackDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[bingoTableId]` on the table `TableDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PackDetails" DROP CONSTRAINT "PackDetails_id_fkey";

-- AlterTable
ALTER TABLE "TableDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "packDetailsId" INTEGER;

-- DropTable
DROP TABLE "PackDetails";

-- CreateIndex
CREATE UNIQUE INDEX "TableDetails_bingoTableId_key" ON "TableDetails"("bingoTableId");
