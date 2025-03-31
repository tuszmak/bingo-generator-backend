/*
  Warnings:

  - The primary key for the `DBUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LikesOnPacks` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "LikesOnPacks" DROP CONSTRAINT "LikesOnPacks_userId_fkey";

-- DropForeignKey
ALTER TABLE "PackDetails" DROP CONSTRAINT "PackDetails_uploadedByUserId_fkey";

-- AlterTable
ALTER TABLE "DBUser" DROP CONSTRAINT "DBUser_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DBUser_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "LikesOnPacks" DROP CONSTRAINT "LikesOnPacks_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "LikesOnPacks_pkey" PRIMARY KEY ("packId", "userId");

-- AlterTable
ALTER TABLE "PackDetails" ALTER COLUMN "uploadedByUserId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "PackDetails" ADD CONSTRAINT "PackDetails_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "DBUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesOnPacks" ADD CONSTRAINT "LikesOnPacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "DBUser"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
