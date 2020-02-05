# CDB Calculator

Service to calculate the value of a post-fixed Certificate of Deposit (CDB) given a range of dates and a CDB rate.

## Usage

The project is available (temporarily) [here](http://54.198.190.124:3000/). You can also use the [API](#api) only.

## Installation

If you'd like to run it locally, you will need [node](http://nodejs.org), [npm](https://npmjs.com) and [Docker](https://www.docker.com/).

* Create a PostgreSQL container using Docker:

```
$ docker run --rm --name cdb-calc -e POSTGRES_PASSWORD=pw_of_your_choice -d -p 5432:5432 -v $HOME/docker/volumes/postgres-cdb-calc:/var/lib/postgresql/data postgres
```
This creates a PostgreSQL container running on port 5432. Upon exit, the database will be deleted.

* Create a file at the root of the project, called `.env`, and insert the database connection info, e.g.:

```
DB_HOST=localhost
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=pw_of_your_choice
```

* Execute the DDL file `scripts/CDI_prices_insert.ddl` on the database (using either `psql` or any database client that supports Postgres)

* Clone the repo and run it

```
$ git clone git@github.com:lkakitani/cdb-calc.git
$ cd cdb-calc
$ npm install
$ npm run dev
```

* The process will be running at `localhost:3000`.

## API

If you'd like to use only the API, the endpoint is `<host>:<port>/api/cdb`. You will need to pass the following query parameters:
* `investmentDate`: `yyyy-MM-dd`
* `currentDate`: `yyyy-MM-dd`
* `cdbRate`: `number`

An example of valid request: `<host>:<port>/api/cdb?investmentDate=2018-01-05&currentDate=2018-01-31&cdbRate=105.5`.

### Todo

* use a CSS framework to make things prettier