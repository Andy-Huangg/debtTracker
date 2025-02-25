/*
  Warnings:

  - Added the required column `title` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debt" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'OPEN';

-- Remove the default value after the column has been added
ALTER TABLE "Debt" ALTER COLUMN "title" DROP DEFAULT;