/*
  Warnings:

  - You are about to drop the column `streak` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "streak",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;
