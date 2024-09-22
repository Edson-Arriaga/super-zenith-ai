/*
  Warnings:

  - You are about to drop the column `disabled` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "disabled",
ADD COLUMN     "forcedRestart" BOOLEAN NOT NULL DEFAULT false;
