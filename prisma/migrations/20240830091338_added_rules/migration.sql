/*
  Warnings:

  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `Player_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_divisionId_fkey`;

-- DropTable
DROP TABLE `team`;

-- CreateTable
CREATE TABLE `Teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `divisionId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `competitionId` INTEGER NOT NULL,
    `divisionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BorrowerInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rulesId` INTEGER NOT NULL,
    `borrower` BOOLEAN NOT NULL,
    `selected` JSON NOT NULL,
    `applyTo` JSON NOT NULL,

    UNIQUE INDEX `BorrowerInfo_rulesId_key`(`rulesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalEligibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rulesId` INTEGER NOT NULL,
    `enabled` BOOLEAN NOT NULL,
    `division` JSON NOT NULL,
    `borrowedPlayers` BOOLEAN NOT NULL,
    `starredMatches` BOOLEAN NOT NULL,
    `rounds` JSON NOT NULL,

    UNIQUE INDEX `FinalEligibility_rulesId_key`(`rulesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Teams` ADD CONSTRAINT `Teams_divisionId_fkey` FOREIGN KEY (`divisionId`) REFERENCES `Division`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rules` ADD CONSTRAINT `Rules_competitionId_fkey` FOREIGN KEY (`competitionId`) REFERENCES `Competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rules` ADD CONSTRAINT `Rules_divisionId_fkey` FOREIGN KEY (`divisionId`) REFERENCES `Division`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BorrowerInfo` ADD CONSTRAINT `BorrowerInfo_rulesId_fkey` FOREIGN KEY (`rulesId`) REFERENCES `Rules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalEligibility` ADD CONSTRAINT `FinalEligibility_rulesId_fkey` FOREIGN KEY (`rulesId`) REFERENCES `Rules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
