-- CreateTable
CREATE TABLE "PackDetails" (
    "foo" TEXT NOT NULL,
    "BingoTableId" INTEGER NOT NULL,

    CONSTRAINT "PackDetails_pkey" PRIMARY KEY ("BingoTableId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PackDetails_BingoTableId_key" ON "PackDetails"("BingoTableId");

-- AddForeignKey
ALTER TABLE "PackDetails" ADD CONSTRAINT "PackDetails_BingoTableId_fkey" FOREIGN KEY ("BingoTableId") REFERENCES "BingoTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
