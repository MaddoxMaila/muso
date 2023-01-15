/*
  Warnings:

  - A unique constraint covering the columns `[trackUserId]` on the table `LikedTracks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trackUserId` to the `LikedTracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LikedTracks" ADD COLUMN     "trackUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LikedTracks.trackUserId_unique" ON "LikedTracks"("trackUserId");
