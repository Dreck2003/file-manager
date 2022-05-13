/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "File_name_key";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "File"("key");
