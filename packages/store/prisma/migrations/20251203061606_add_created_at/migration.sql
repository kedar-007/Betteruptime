/*
  Warnings:

  - You are about to drop the column `time_added` on the `website` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "website" DROP COLUMN "time_added",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "website_tick" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
