/*
  Warnings:

  - You are about to drop the column `isPaid` on the `BillShare` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'PARTIALLY_PAID');

-- AlterTable
ALTER TABLE "BillShare" DROP COLUMN "isPaid",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
