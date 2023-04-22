# nest-rest-api

## Description

It is a RESTful API built using the NestJS framework and MongoDB as the database. It is a scalable server-side API for the music platform written in TypeScript.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
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

- "@nestjs/cli": "^9.0.0"
- "@nestjs/schematics": "^9.0.0"
- "@nestjs/testing": "^9.0.0"
- "@types/express": "^4.17.13"
- "@types/jest": "29.2.4"
- "@types/multer": "^1.4.7"
- "@types/node": "18.11.18"
- "@types/supertest": "^2.0.11"

## Author

Kostia
