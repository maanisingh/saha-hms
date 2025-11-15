-- CreateTable
CREATE TABLE IF NOT EXISTS `system_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `defaultLanguage` VARCHAR(191) NOT NULL DEFAULT 'en',
    `defaultDirection` VARCHAR(191) NOT NULL DEFAULT 'ltr',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default settings if table is empty
INSERT INTO `system_settings` (`id`, `defaultLanguage`, `defaultDirection`, `createdAt`, `updatedAt`)
SELECT 1, 'en', 'ltr', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM `system_settings` LIMIT 1);
