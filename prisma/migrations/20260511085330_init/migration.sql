-- CreateTable
CREATE TABLE `services` (
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(100) NOT NULL,
    `tagline` VARCHAR(500) NOT NULL,
    `description` TEXT NOT NULL,
    `longDescription` TEXT NOT NULL,
    `benefits` JSON NOT NULL,
    `process` JSON NOT NULL,
    `technologies` JSON NOT NULL,
    `faqs` JSON NOT NULL,
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` VARCHAR(500) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'published',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `services_status_idx`(`status`),
    INDEX `services_category_idx`(`category`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(100) NOT NULL,
    `tagline` VARCHAR(500) NOT NULL,
    `description` TEXT NOT NULL,
    `longDescription` TEXT NOT NULL,
    `features` JSON NOT NULL,
    `modules` JSON NOT NULL,
    `benefits` JSON NOT NULL,
    `technologies` JSON NOT NULL,
    `pricing` JSON NULL,
    `faqs` JSON NOT NULL,
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` VARCHAR(500) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'published',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `products_status_idx`(`status`),
    INDEX `products_category_idx`(`category`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blog_posts` (
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `category` VARCHAR(100) NOT NULL,
    `tags` JSON NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `coverColor` VARCHAR(100) NOT NULL,
    `publishedAt` DATETIME(3) NOT NULL,
    `readingMinutes` INTEGER NOT NULL DEFAULT 1,
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` VARCHAR(500) NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'draft',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `blog_posts_status_idx`(`status`),
    INDEX `blog_posts_category_idx`(`category`),
    INDEX `blog_posts_publishedAt_idx`(`publishedAt`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
