# AFCON Challenge (API)

This is the backend API for the AFCON Challenge project. It is built using [Bun](https://bun.sh), [Elysia](https://elysiajs.com/), [Prisma](https://prisma.io/), and [PostgreSQL](https://postgresql.org/).

## Prerequisites

- [Bun](https://bun.sh) - Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one.

## Getting up and running

### Production

All you need is Docker and Docker Compose installed on your machine. Then you can run the following commands:

```sh
cp .env.example .env # To create a .env file
docker compose up -d # To get everything up and running
```

### Development

```sh
cp .env.example .env # To create a .env file

bun i # To install dependencies

bun start # To start the server

bun dev # To start the development server
```
