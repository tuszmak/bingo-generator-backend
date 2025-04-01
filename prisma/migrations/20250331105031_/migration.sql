/*
  Warnings:

  - You are about to drop the column `likes` on the `PackDetails` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedBy` on the `PackDetails` table. All the data in the column will be lost.
  - Added the required column `uploadedByUserId` to the `PackDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PackDetails" DROP COLUMN "likes",
DROP COLUMN "uploadedBy",
ADD COLUMN     "uploadedByUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "LikesOnPacks" (
    "userId" INTEGER NOT NULL,
    "packId" INTEGER NOT NULL,

    CONSTRAINT "LikesOnPacks_pkey" PRIMARY KEY ("packId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "PackDetails" ADD CONSTRAINT "PackDetails_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesOnPacks" ADD CONSTRAINT "LikesOnPacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesOnPacks" ADD CONSTRAINT "LikesOnPacks_packId_fkey" FOREIGN KEY ("packId") REFERENCES "PackDetails"("packDetailsId") ON DELETE RESTRICT ON UPDATE CASCADE;
