/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Settings" (
    "guildId" TEXT NOT NULL,
    "voiceStateUpdateChannel" TEXT,
    "radioStation" TEXT,
    "autoRadioVoiceChannel" TEXT,
    "autoRole" TEXT,
    "welcomeChannel" TEXT,
    "goodbyeChannel" TEXT,
    "chatbotChannel" TEXT,
    "chatBotSystemPrompt" TEXT DEFAULT 'You are a helpful and smart assistant writing on Discord guild.. You are able to adapt your language to the one in which the user is writing. Use emoticons to make the conversation more engaging (though not too often!).',
    "chatBotTemperature" INTEGER DEFAULT 1,
    "chatBotMaxTokens" INTEGER DEFAULT 1024,
    "chatbotAPIKey" TEXT,
    "huggingFaceToken" TEXT,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Users" (
    "type" TEXT NOT NULL DEFAULT 'normal',
    "userId" TEXT NOT NULL,
    "usedCommand" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Custombots" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "activity" TEXT NOT NULL DEFAULT 'Skyndalex v2.0 | discord.skyndalex.com',
    "status" TEXT NOT NULL DEFAULT 'offline',

    CONSTRAINT "Custombots_pkey" PRIMARY KEY ("id","userId")
);

-- CreateTable
CREATE TABLE "Cases" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT,
    "reason" TEXT,
    "date" BIGINT,
    "moderator" TEXT NOT NULL,
    "duration" TEXT,
    "active" BOOLEAN,

    CONSTRAINT "Cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikedRadios" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "radioId" TEXT NOT NULL,
    "radioName" TEXT NOT NULL,

    CONSTRAINT "LikedRadios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomBotSettings" (
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "radioStation" TEXT,
    "autoRadioVoiceChannel" TEXT,
    "guildId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Petitions" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "signedCount" INTEGER NOT NULL,

    CONSTRAINT "Petitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlreadySignedPetitions" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "petitionId" INTEGER NOT NULL,

    CONSTRAINT "AlreadySignedPetitions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomBotSettings_clientId_key" ON "CustomBotSettings"("clientId");
