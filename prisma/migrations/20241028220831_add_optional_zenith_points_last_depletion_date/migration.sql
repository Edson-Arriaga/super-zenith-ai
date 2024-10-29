-- AlterTable
ALTER TABLE "User" ALTER COLUMN "zenithPointsLastDepletionDate" DROP NOT NULL,
ALTER COLUMN "zenithPointsLastDepletionDate" DROP DEFAULT;
