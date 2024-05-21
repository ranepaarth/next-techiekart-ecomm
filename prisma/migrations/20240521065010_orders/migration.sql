-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "amountSubTotal" DOUBLE PRECISION NOT NULL,
    "amountTotal" DOUBLE PRECISION NOT NULL,
    "shippingAmount" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
