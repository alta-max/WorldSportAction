/*
  Warnings:

  - A unique constraint covering the columns `[competitionId]` on the table `Rules` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[divisionId]` on the table `Rules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `rules` DROP FOREIGN KEY `Rules_divisionId_fkey`;

-- AlterTable
ALTER TABLE `rules` MODIFY `divisionId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Rules_competitionId_key` ON `Rules`(`competitionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rules_divisionId_key` ON `Rules`(`divisionId`);

-- AddForeignKey
ALTER TABLE `Rules` ADD CONSTRAINT `Rules_divisionId_fkey` FOREIGN KEY (`divisionId`) REFERENCES `Division`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
