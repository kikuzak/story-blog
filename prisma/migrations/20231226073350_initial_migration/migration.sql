-- CreateTable
CREATE TABLE `article` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `class_number` VARCHAR(191) NULL,
    `article_category_id` INTEGER UNSIGNED NULL,
    `region_id` INTEGER UNSIGNED NULL,
    `country_id` INTEGER UNSIGNED NULL,
    `period_id` INTEGER UNSIGNED NULL,
    `prefecture_id` INTEGER UNSIGNED NULL,
    `author_id` INTEGER UNSIGNED NULL,
    `source_category_id` INTEGER UNSIGNED NULL,
    `source` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `kana` VARCHAR(1) NOT NULL,
    `content` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_public` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article_category_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `country_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kana` VARCHAR(1) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `period_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prefecture_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `kana` VARCHAR(1) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `source_category_master` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_article_category_id_fkey` FOREIGN KEY (`article_category_id`) REFERENCES `article_category_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `country_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_period_id_fkey` FOREIGN KEY (`period_id`) REFERENCES `period_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_prefecture_id_fkey` FOREIGN KEY (`prefecture_id`) REFERENCES `prefecture_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `author`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `article` ADD CONSTRAINT `article_source_category_id_fkey` FOREIGN KEY (`source_category_id`) REFERENCES `source_category_master`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
