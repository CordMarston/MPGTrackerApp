/*
  Warnings:

  - You are about to drop the column `date` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `logDate` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "date",
ADD COLUMN     "logDate" TIMESTAMP(3) NOT NULL;
