# AFCON Challenge (API)
[![Better Stack Badge](https://uptime.betterstack.com/status-badges/v3/monitor/10vva.svg)](https://uptime.betterstack.com/?utm_source=status_badge)

This is the backend API for the AFCON Challenge project. It is built using [Bun](https://bun.sh), [Elysia](https://elysiajs.com/), [Prisma](https://prisma.io/), and [PostgreSQL](https://postgresql.org/).

## Getting up and running

Clone the repo:

```sh
git clone https://github.com/afcon-challenge/backend
```

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

Also, check [useful commands in production](#useful-commands-in-production).

### Development

You need to have [Bun](https://bun.sh) installed.

```sh
cp .env.example .env # To create a .env file

bun i # To install dependencies

bun start # To start the server

bun dev # To start the development server
```

## Useful commands in production

Check logs in real-time: 

```sh
docker compose logs -f
```

Check logs of some service, _api_ for example:

```sh
docker compose logs api -f 
```

Rebuild:

```sh
docker compose up --build -d 
```

Connect to the database using psql (`mydb` is the database used by the api):
```sh
docker compose exec db psql -U judge0 -d mydb
```

Execute some SQL statement without connection: 

```sh
docker compose exec db psql -U judge0 -d mydb -c 'SELECT username, verdict, "createdAt" FROM "Submission" ORDER BY "createdAt" DESC;'
```
