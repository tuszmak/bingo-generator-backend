/*
  Warnings:

  - You are about to drop the `TableDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TableDetails" DROP CONSTRAINT "TableDetails_bingoTableId_fkey";

-- DropTable
DROP TABLE "TableDetails";

-- CreateTable
CREATE TABLE "PackDetails" (
    "detailsId" SERIAL NOT NULL,
    "bingoTableId" INTEGER NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "likes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "packDetailsId" INTEGER,

    CONSTRAINT "PackDetails_pkey" PRIMARY KEY ("detailsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PackDetails_bingoTableId_key" ON "PackDetails"("bingoTableId");

-- AddForeignKey
ALTER TABLE "PackDetails" ADD CONSTRAINT "PackDetails_bingoTableId_fkey" FOREIGN KEY ("bingoTableId") REFERENCES "BingoTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
