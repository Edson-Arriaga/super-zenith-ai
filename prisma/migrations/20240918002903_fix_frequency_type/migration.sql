/*
  Warnings:

  - Changed the type of `frequency` on the `Habit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN "frequency_new" "Frequency" NOT NULL DEFAULT 'DAILY';
UPDATE "Habit" SET "frequency_new" = 'DAILY';

ALTER TABLE "Habit" DROP COLUMN "frequency";
ALTER TABLE "Habit" RENAME COLUMN "frequency_new" TO "frequency";