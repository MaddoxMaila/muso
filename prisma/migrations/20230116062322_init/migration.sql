-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_playlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_playlist" ("created_at", "id", "name", "userId") SELECT "created_at", "id", "name", "userId" FROM "playlist";
DROP TABLE "playlist";
ALTER TABLE "new_playlist" RENAME TO "playlist";
CREATE TABLE "new_playlist_track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trackId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    CONSTRAINT "playlist_track_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "playlist_track_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "playlist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_playlist_track" ("created_at", "id", "playlistId", "trackId") SELECT "created_at", "id", "playlistId", "trackId" FROM "playlist_track";
DROP TABLE "playlist_track";
ALTER TABLE "new_playlist_track" RENAME TO "playlist_track";
CREATE TABLE "new_track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "artwork" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "track_userId_fkey" FOREIGN KEY ("userId") REFERENCES "admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_track" ("album", "artist", "artwork", "audio", "created_at", "duration", "id", "name", "userId", "year") SELECT "album", "artist", "artwork", "audio", "created_at", "duration", "id", "name", "userId", "year" FROM "track";
DROP TABLE "track";
ALTER TABLE "new_track" RENAME TO "track";
CREATE TABLE "new_LikedTracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trackUserId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "LikedTracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "track" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LikedTracks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LikedTracks" ("id", "trackId", "trackUserId", "userId") SELECT "id", "trackId", "trackUserId", "userId" FROM "LikedTracks";
DROP TABLE "LikedTracks";
ALTER TABLE "new_LikedTracks" RENAME TO "LikedTracks";
CREATE UNIQUE INDEX "LikedTracks_trackUserId_key" ON "LikedTracks"("trackUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineIndex
DROP INDEX "admin.email_unique";
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");
