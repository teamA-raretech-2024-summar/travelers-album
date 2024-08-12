-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FellowTraveler" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "fellow_id" TEXT NOT NULL,

    CONSTRAINT "FellowTraveler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripboardUser" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,

    CONSTRAINT "TripboardUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripBoard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripCard" (
    "id" TEXT NOT NULL,
    "board_id" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "thumbnail_id" INTEGER NOT NULL,

    CONSTRAINT "TripCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardPicture" (
    "id" TEXT NOT NULL,
    "card_id" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "photo_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardPicture_pkey" PRIMARY KEY ("id")
);
