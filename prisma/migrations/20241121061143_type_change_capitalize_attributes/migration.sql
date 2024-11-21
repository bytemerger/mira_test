/*
  Warnings:

  - The primary key for the `ExchangeStatementEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyPrice` on the `ExchangeStatementEntry` table. All the data in the column will be lost.
  - You are about to drop the column `capAmount` on the `ExchangeStatementEntry` table. All the data in the column will be lost.
  - You are about to drop the column `destinationCurrency` on the `ExchangeStatementEntry` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ExchangeStatementEntry` table. All the data in the column will be lost.
  - You are about to drop the column `sellPrice` on the `ExchangeStatementEntry` table. All the data in the column will be lost.
  - You are about to drop the column `sourceCurrency` on the `ExchangeStatementEntry` table. All the data in the column will be lost.
  - Added the required column `BuyPrice` to the `ExchangeStatementEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CapAmount` to the `ExchangeStatementEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DestinationCurrency` to the `ExchangeStatementEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SellPrice` to the `ExchangeStatementEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SourceCurrency` to the `ExchangeStatementEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExchangeStatementEntry" DROP CONSTRAINT "ExchangeStatementEntry_pkey",
DROP COLUMN "buyPrice",
DROP COLUMN "capAmount",
DROP COLUMN "destinationCurrency",
DROP COLUMN "id",
DROP COLUMN "sellPrice",
DROP COLUMN "sourceCurrency",
ADD COLUMN     "BuyPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "CapAmount" INTEGER NOT NULL,
ADD COLUMN     "DestinationCurrency" TEXT NOT NULL,
ADD COLUMN     "EntryId" SERIAL NOT NULL,
ADD COLUMN     "SellPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "SourceCurrency" TEXT NOT NULL,
ADD CONSTRAINT "ExchangeStatementEntry_pkey" PRIMARY KEY ("EntryId");
