-- CreateTable
CREATE TABLE "TypingTest" (
    "id" SERIAL NOT NULL,
    "egPassword" TEXT NOT NULL,
    "btPassword" TEXT NOT NULL,
    "egTypedPassword1" TEXT NOT NULL,
    "egTypedPassword2" TEXT NOT NULL,
    "egTypedPassword3" TEXT NOT NULL,
    "egTypedPassword4" TEXT NOT NULL,
    "egTypedPassword5" TEXT NOT NULL,
    "btTypedPassword1" TEXT NOT NULL,
    "btTypedPassword2" TEXT NOT NULL,
    "btTypedPassword3" TEXT NOT NULL,
    "btTypedPassword4" TEXT NOT NULL,
    "btTypedPassword5" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypingTest_pkey" PRIMARY KEY ("id")
);
