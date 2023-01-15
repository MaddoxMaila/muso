-- CreateTable
CREATE TABLE "track" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "album" VARCHAR(100) NOT NULL,
    "artist" VARCHAR(100) NOT NULL,
    "duration" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "artwork" TEXT NOT NULL,
    "audio" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "creator" VARCHAR(100) NOT NULL,
    "playtime" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playlist_track" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "playlist_track" ADD FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playlist_track" ADD FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
