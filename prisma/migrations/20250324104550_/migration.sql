/*
  Warnings:

  - The primary key for the `PackDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detailsId` on the `PackDetails` table. All the data in the column will be lost.
  - Made the column `packDetailsId` on table `PackDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE packdetails_packdetailsid_seq;
ALTER TABLE "PackDetails" DROP CONSTRAINT "PackDetails_pkey",
DROP COLUMN "detailsId",
ALTER COLUMN "packDetailsId" SET NOT NULL,
ALTER COLUMN "packDetailsId" SET DEFAULT nextval('packdetails_packdetailsid_seq'),
ADD CONSTRAINT "PackDetails_pkey" PRIMARY KEY ("packDetailsId");
ALTER SEQUENCE packdetails_packdetailsid_seq OWNED BY "PackDetails"."packDetailsId";
