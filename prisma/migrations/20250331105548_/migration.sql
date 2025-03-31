/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LikesOnPacks" DROP CONSTRAINT "LikesOnPacks_userId_fkey";

-- DropForeignKey
ALTER TABLE "PackDetails" DROP CONSTRAINT "PackDetails_uploadedByUserId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "DBUser" (
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DBUser_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DBUser_userId_key" ON "DBUser"("userId");

-- AddForeignKey
ALTER TABLE "PackDetails" ADD CONSTRAINT "PackDetails_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "DBUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesOnPacks" ADD CONSTRAINT "LikesOnPacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DBUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
