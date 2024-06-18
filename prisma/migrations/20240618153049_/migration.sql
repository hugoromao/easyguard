-- CreateTable
CREATE TABLE "MemoryTest" (
    "id" SERIAL NOT NULL,
    "egPassword1" TEXT NOT NULL,
    "egPassword2" TEXT NOT NULL,
    "btPassword1" TEXT NOT NULL,
    "btPassword2" TEXT NOT NULL,
    "egTypedPassword1" TEXT NOT NULL,
    "egTypedPassword2" TEXT NOT NULL,
    "btTypedPassword1" TEXT NOT NULL,
    "btTypedPassword2" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemoryTest_pkey" PRIMARY KEY ("id")
);
