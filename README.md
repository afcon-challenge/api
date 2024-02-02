# AFCON Challenge (API)

This is the backend API for the AFCON Challenge project. It is built using [Bun](https://bun.sh), [Elysia](https://elysiajs.com/), [Prisma](https://prisma.io/), and [PostgreSQL](https://postgresql.org/).

## Prerequisites

- [Bun](https://bun.sh) - Incredibly fast JavaScript runtime, bundler, test runner, and package manager – all in one.

## Getting up and running

### Production

You need to have [Docker](https://docs.docker.com/engine/install/) installed.

> [!NOTE]
> You'll need to change the _domain_ in the Caddyfile to your domain name.

Then you can run the following commands:

```sh
cp .env.example .env # To create a .env file
docker compose up -d # To get everything up and running
docker compose exec api bunx prisma migrate deploy # Run the database migration
```

### Development

```sh
cp .env.example .env # To create a .env file

bun i # To install dependencies

bun start # To start the server

bun dev # To start the development server
```
