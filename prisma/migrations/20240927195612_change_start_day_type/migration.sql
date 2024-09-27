/*
  Warnings:

  - You are about to drop the column `failedDays` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `startDay` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "failedDays",
ADD COLUMN     "failedDates" TEXT[],
ADD COLUMN     "startDay" TEXT NOT NULL;
