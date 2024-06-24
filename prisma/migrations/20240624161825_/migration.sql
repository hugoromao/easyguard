/*
  Warnings:

  - Added the required column `name` to the `UsabilitySurvey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsabilitySurvey" ADD COLUMN     "name" TEXT NOT NULL;
