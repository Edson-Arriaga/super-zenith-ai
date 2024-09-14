/*
  Warnings:

  - You are about to drop the column `name` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `frequency` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PREMIUM');

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "name",
ADD COLUMN     "completedDates" TIMESTAMP(3)[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "daysOfWeek" TEXT[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "longestStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "zenithPoints" INTEGER NOT NULL DEFAULT 5;
