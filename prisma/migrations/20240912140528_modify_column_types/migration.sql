/*
  Warnings:

  - You are about to drop the column `daysOfWeek` on the `Habit` table. All the data in the column will be lost.
  - Changed the type of `category` on the `Habit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PHYSICAL_HEALTH', 'MENTAL_HEALTH', 'PERSONAL_GROWTH', 'SOCIAL_RELATIONSHIPS', 'SPIRITUALITY', 'PRODUCTIVITY', 'CREATIVITY');

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "daysOfWeek",
ADD COLUMN     "daysPerWeek" INTEGER,
DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL;
