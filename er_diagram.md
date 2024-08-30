```mermaid
erDiagram
    COMPETITION {
        int id PK
        string name
    }
    DIVISION {
        int id PK
        int competitionId FK
        string name
    }
    TEAMS {
        int id PK
        int divisionId FK
        string name
    }
    PLAYER {
        int id PK
        int teamId FK
        string name
    }
    RULES {
        int id PK
        int competitionId FK
        int divisionId FK
    }
    BORROWER_INFO {
        int id PK
        int rulesId FK
        boolean borrower
        json selected
        json applyTo
    }
    FINAL_ELIGIBILITY {
        int id PK
        int rulesId FK
        boolean enabled
        json division
        boolean borrowedPlayers
        boolean starredMatches
        json rounds
    }

    COMPETITION ||--o{ DIVISION : has
    DIVISION ||--o{ TEAMS : has
    TEAMS ||--o{ PLAYER : has
    COMPETITION ||--|| RULES : has
    DIVISION ||--|| RULES : has
    RULES ||--o{ BORROWER_INFO : has
    RULES ||--o{ FINAL_ELIGIBILITY : has
