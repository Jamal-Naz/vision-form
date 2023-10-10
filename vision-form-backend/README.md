Vision Form

This is an Express backend project integrated with Prisma for managing users. It provides a registration endpoint to add new users to the database.

## Features

- User registration endpoint.
- SQLite database for storing user information.
- Data validation and error handling.


## Install the dependencies:
1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-dir>
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Setup environment variables:

    Copy the .env.example file and rename it to .env.development. Fill in the required environment variables like NEXT_PUBLIC_API_URL.

4. Run Prisma Migrations:

    Initialize your SQLite database and apply migrations:
    ```bash
    npx prisma migrate dev
    ```


## Getting Started

First, run the development server:

```bash
npm run dev
```
