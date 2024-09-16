/*
  Warnings:

  - You are about to drop the column `daysPerWeek` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "daysPerWeek",
ADD COLUMN     "weeklyDays" INTEGER[];
