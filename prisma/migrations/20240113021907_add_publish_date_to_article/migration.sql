/*
  Warnings:

  - You are about to drop the column `is_public` on the `article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `is_public`,
    ADD COLUMN `published_at` DATETIME(3) NULL;
