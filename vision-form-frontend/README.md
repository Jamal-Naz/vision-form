Vision Form

This repository contains a multi-section accordion form built using React, Next.js, and Material-UI for styling.

## Features

- Three individual sections for user data input: SectionOne, SectionTwo, and SectionThree.
- Each section has its own validation logic.
- Incomplete sections are tracked.
- Provides feedback to the user using snackbar alerts.
- Form submission to an external API.

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

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
