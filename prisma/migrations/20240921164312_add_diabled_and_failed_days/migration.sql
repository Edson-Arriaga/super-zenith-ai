-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "failedDays" TEXT[];
