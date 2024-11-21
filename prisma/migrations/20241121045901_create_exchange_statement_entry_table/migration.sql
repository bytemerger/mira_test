-- CreateTable
CREATE TABLE "ExchangeStatementEntry" (
    "id" SERIAL NOT NULL,
    "sourceCurrency" TEXT NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "buyPrice" TEXT NOT NULL,
    "sellPrice" TEXT NOT NULL,
    "capAmount" TEXT NOT NULL,

    CONSTRAINT "ExchangeStatementEntry_pkey" PRIMARY KEY ("id")
);
