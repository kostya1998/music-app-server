# Nest.js Server-music-platform

## Description

It is a music platform server built using the NestJS framework and TypeScript. MongoDB as a database. The application frontend can be downloaded from this link https://github.com/kostya1998/music-app-frontend. This is a scalable server-side API for interacting with and processing audio tracks, albums, and comments. The server consists of separate modules, each of which interacts with a specific entity, which allows you to further expand the application. You can learn more about the architecture on the official website https://nestjs.com/

### Database

Remote MongoDB database. to connect the database, you need to go to the official website https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/ register, create a free classter.


## Installation

1. Clone the repository from GitHub: `git clone https://github.com/kostya1998/server-music-platform.git`.

2. Change to your project folder: `cd your-repository`.

3. Install dependencies: `npm install`.

4. Create a file `app.config.ts`in the root of your project and add the following environment variables:

```bash
PORT=`your-PORT`
MongoURI=mongodb+srv://your-username:your-password@your-cluster-url.your-provider.net/your-database-name?retryWrites=true&w=majority
```

## Running the app

```bash
# development
$ npm run start:dev

```

## API Endpoints

- `GET /resources`: Get all resources
- `GET /resources/:id`: Get a single resource by id
- `POST /resources`: Create a new resource
- `PUT /resources/:id`: Update a resource
- `DELETE /resources/:id`: Delete a resource

## Dependencies

This project uses the following dependencies:

-"@nestjs/common": "^9.0.0"

- "@nestjs/core": "^9.0.0"
- "@nestjs/mongoose": "^9.2.1"
- "@nestjs/platform-express": "^9.0.0"
- "@nestjs/serve-static": "^3.0.1"
- "mongoose": "^6.9.1"
- "reflect-metadata": "^0.1.13"
- "rxjs": "^7.2.0"
- "uuid": "^9.0.0"

## Dev Dependencies

This project uses the following dev dependencies:

    -"@nestjs/cli": "^9.0.0",
    -"@nestjs/schematics": "^9.0.0",
    -"@nestjs/testing": "^9.0.0",
    -"@types/express": "^4.17.13",
    -"@types/jest": "29.2.4",
    -"@types/multer": "^1.4.7",
    -"@types/node": "18.11.18",
    -"@types/supertest": "^2.0.11",
    -"@types/uuid": "^9.0.0",
    -"@typescript-eslint/eslint-plugin": "^5.0.0",
    -"@typescript-eslint/parser": "^5.0.0",
    -"eslint": "^8.0.1",
    -"eslint-config-prettier": "^8.3.0",
    -"eslint-plugin-prettier": "^4.0.0",
    -"jest": "29.3.1",
    -"prettier": "^2.3.2",
    -"source-map-support": "^0.5.20",
    -"supertest": "^6.1.3",
    -"ts-jest": "29.0.3",
    -"ts-loader": "^9.2.3",
    -"ts-node": "^10.0.0",
    -"tsconfig-paths": "4.1.1",
    -"typescript": "^4.7.4"

## Author

kostyadorogiy@gmail.com
