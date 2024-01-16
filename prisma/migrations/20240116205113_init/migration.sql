-- CreateTable
CREATE TABLE "Submission" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "languageId" INTEGER NOT NULL,
    "verdict" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
