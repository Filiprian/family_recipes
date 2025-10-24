CREATE DATABASE IF NOT EXISTS family_recipes_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE family_recipes_db;

CREATE TABLE recipes (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `tag` VARCHAR(100) NOT NULL,
    `ingredients` MEDIUMTEXT NOT NULL,
    `process` MEDIUMTEXT NOT NULL,
    `minutes` INT UNSIGNED NOT NULL DEFAULT 0,
    `portions` INT UNSIGNED NOT NULL DEFAULT 0,
    `image` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;