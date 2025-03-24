-- CreateTable
CREATE TABLE "TableDetails" (
    "detailsId" SERIAL NOT NULL,
    "bingoTableId" INTEGER NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "likes" TEXT[],

    CONSTRAINT "TableDetails_pkey" PRIMARY KEY ("detailsId")
);

-- AddForeignKey
ALTER TABLE "TableDetails" ADD CONSTRAINT "TableDetails_bingoTableId_fkey" FOREIGN KEY ("bingoTableId") REFERENCES "BingoTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
