/*
  Warnings:

  - The `completedDates` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `failedDates` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `startDay` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "completedDates",
ADD COLUMN     "completedDates" TIMESTAMP(3)[],
DROP COLUMN "failedDates",
ADD COLUMN     "failedDates" TIMESTAMP(3)[],
DROP COLUMN "startDay",
ADD COLUMN     "startDay" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
