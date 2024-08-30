import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const teamId: number = 3; // Team ID to check, which players can be borrowed
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
    include: {
      // Here I am including the competition, because I need to get the rules from the competition
      // However I can access the rules from the divisions as well
      division: { 
        include: {
          competition: {
            include: {
              rule: true, // Include rules in the competition
            },
          },
        },
      },
    },
  });

  // Check if the team exists, if not, return
  if (!team) {
    console.log('Team not found.');
    return;
  }
  // console.log(team);

  // const divisionId = team.division.id;
  // For every competition, there is only one rule config model
  // Note: This is not rule, this is just a base model that stores info about the rules, competition and division
  const rule = team.division.competition.rule;
  // console.log('Rules:', rule);


  //Fetch all the borrower info that belongs to that particular rule config
  const borrowerInfo = await prisma.borrowerInfo.findMany({  
    where: {
      id: rule?.id,
    },
  });

  // console.log('Borrower Info:', borrowerInfo);

  // Out of all the borrower info, filter the one that stores information about the required team
  const filteredBorrowerInfo = borrowerInfo.filter((info) => {
    const selectedIds = JSON.parse(info.selected as string) as number[];

    return selectedIds.includes(teamId)
  });

  // console.log(filteredBorrowerInfo);
  // If the team is not allowed to borrow, return
  if (filteredBorrowerInfo[0].borrower === false) {
    console.log('Borrowing is not allowed.');
    return;
  }

  // const borrowerInfo = rules.applyTo;
  // In the end return the list of players that can be borrowed
  const applyToDivisionIds = JSON.parse(filteredBorrowerInfo[0]?.applyTo as string) as number[];

  const borrowablePlayers = await prisma.player.findMany({
    where: {
      team: {
        divisionId: {
          in: applyToDivisionIds,
        },
      },
    },
  });

  console.log('Borrowable players:', borrowablePlayers);
  

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })