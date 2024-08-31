# Sports Competition Management System

This project implements a sports competition management system using Prisma ORM with TypeScript. It focuses on managing competitions, divisions, teams, players, and implements borrowing rules for players.

## Features

- Competition and division management
- Team and player tracking
- Configurable borrowing rules
- Player eligibility checks for borrowing

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MySQL database

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/alta-max/WorldSportAction.git
   cd WorldSportaction
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your database connection:
   - Create a `.env` file in the project root
   - Add your database URL:
     ```
     DATABASE_URL="mysql://username:password@localhost:3306/your_database"
     ```

4. Run Prisma migrations:
   ```
   npx prisma migrate dev
   ```

5. Populate the database with initial data:
   ```
   npm run populate
   ```
   This command runs the `populate.ts` script, which fills the database with some initial values for testing and development purposes

## Usage

To run the borrowing rules check:

```
npm run start
```

This will execute the main function, which demonstrates how to:
- Fetch a team and its associated rules
- Check borrowing eligibility
- Retrieve a list of borrowable players

## Project Structure

- `prisma/schema.prisma`: Defines the data model
- `src/index.ts`: Main script implementing borrowing rules

## Key Components

- `Competition`: Top-level entity for organizing events
- `Division`: Subdivisions within a competition
- `Team`: Represents teams in divisions
- `Player`: Individual players in teams
- `Rules`: Configurable rules for competitions/divisions
- `BorrowerInfo`: Specific configuration for borrowing rules
- `FinalEligibility`: Specific configuration for finals eligibility

## Borrowing Rules Logic

1. Fetch team by ID
2. Retrieve associated competition rules
3. Check borrowing eligibility based on `BorrowerInfo`
4. If eligible, return players from allowed divisions
