# TripTribe Frontend

TripTribe is a platform dedicated to providing users with recommended attractions and restaurants. Featuring a transparent rating system and authentic reviews, we prioritize genuine user experiences to guide your next adventure.

## The frontend is built with the following technologies:

[Reactjs]

[Nextjs]

[ContextAPI]

[Typescript]

[TailwindCSS]

[MaterialUI]

## Installation

Use the following commands to install dependencies

```
npm install
```

## Usage Instructions

### Update environment variables

1. Duplicate the .env.example file as follows:

   For the development environment (recommended):

   ```
   $ cp .env.example .env.development
   ```

   For the production environment:

   ```
   $ cp .env.example .env.local
   ```

2. Reach out to the group leader for comprehensive environment variables and update the environment files like .env.development/.env.local accordingly.

### Start the project

- Ensure the backend is running firstly, then run the front-end in development environment

```
npm run dev
```

- Run in production environment

```
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### port

The default port is 3000, to change it, use:
for development:

```
npm run dev -- --port 4000
```

##### or

for production:

```
npm run build
PORT=4000 npm start
```
