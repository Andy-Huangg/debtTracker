/*
  Warnings:

  - Added the required column `status` to the `Debt` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DebtStatus" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "Debt" ADD COLUMN     "status" "DebtStatus" NOT NULL;
