/*
  Warnings:

  - The values [PERSONAL_GROWTH] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('PHYSICAL_HEALTH', 'MENTAL_HEALTH', 'SPIRITUALITY', 'SOCIAL_RELATIONSHIPS', 'PRODUCTIVITY', 'CREATIVITY');
ALTER TABLE "Habit" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
