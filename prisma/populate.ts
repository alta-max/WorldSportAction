// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a Competition
  const competition = await prisma.competition.create({
    data: {
      name: 'Championship League',
    },
  });

  // Create three Divisions
  const division1 = await prisma.division.create({
    data: {
      name: 'Division A',
      competitionId: competition.id,
    },
  });

  const division2 = await prisma.division.create({
    data: {
      name: 'Division B',
      competitionId: competition.id,
    },
  });

  const division3 = await prisma.division.create({
    data: {
      name: 'Division C',
      competitionId: competition.id,
    },
  });

  // Create Teams for each Division
  const team1A = await prisma.teams.create({
    data: {
      name: 'Team Alpha A',
      divisionId: division1.id,
    },
  });

  const team1B = await prisma.teams.create({
    data: {
      name: 'Team Beta A',
      divisionId: division1.id,
    },
  });

  const team2A = await prisma.teams.create({
    data: {
      name: 'Team Alpha B',
      divisionId: division2.id,
    },
  });

  const team2B = await prisma.teams.create({
    data: {
      name: 'Team Beta B',
      divisionId: division2.id,
    },
  });

  const team3A = await prisma.teams.create({
    data: {
      name: 'Team Alpha C',
      divisionId: division3.id,
    },
  });

  const team3B = await prisma.teams.create({
    data: {
      name: 'Team Beta C',
      divisionId: division3.id,
    },
  });

  // Create Players for each Team
  await prisma.player.createMany({
    data: [
      { name: 'Player 1A', teamId: team1A.id },
      { name: 'Player 2A', teamId: team1A.id },
      { name: 'Player 1B', teamId: team1B.id },
      { name: 'Player 2B', teamId: team1B.id },
      { name: 'Player 1C', teamId: team2A.id },
      { name: 'Player 2C', teamId: team2A.id },
      { name: 'Player 1D', teamId: team2B.id },
      { name: 'Player 2D', teamId: team2B.id },
      { name: 'Player 1E', teamId: team3A.id },
      { name: 'Player 2E', teamId: team3A.id },
      { name: 'Player 1F', teamId: team3B.id },
      { name: 'Player 2F', teamId: team3B.id },
    ],
  });

  // Create Rules
  const rules = await prisma.rules.create({
    data: {
      competitionId: competition.id,
      divisionId: division1.id, // This is optional
    },
  });

  // Create BorrowerInfo
  await prisma.borrowerInfo.create({
    data: {
      rulesId: rules.id,
      borrower: true,
      selected: JSON.stringify([division1.id, division2.id, division3.id]), // Contains a list of divisions that can borrow players
      applyTo: JSON.stringify([division2.id]), // Contains a list of divisions that can be borrowed from
    },
  });

  // Create FinalEligibility
  await prisma.finalEligibility.create({
    data: {
      rulesId: rules.id,
      enabled: true,
      division: JSON.stringify([division1.id, division2.id, division3.id]), // Contains a list of divisions that can borrow players
      borrowedPlayers: true,
      starredMatches: false,
      rounds: JSON.stringify([1, 2, 3]), // Contains a list of round IDs
    },
  });

  console.log('Data populated successfully.');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
