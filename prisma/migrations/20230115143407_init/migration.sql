/*
  Warnings:

  - Added the required column `userId` to the `track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "track" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "track" ADD FOREIGN KEY ("userId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
