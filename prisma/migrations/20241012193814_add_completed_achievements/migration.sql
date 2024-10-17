/*
  Warnings:

  - You are about to drop the column `streak` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "streak",
ADD COLUMN     "completedAchievements" INTEGER[];
