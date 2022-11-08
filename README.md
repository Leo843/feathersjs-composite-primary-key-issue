# feathersjs composite primary key issue

> This repository is used to reproduce an issue

## Description

The issue appears when the model is defined with a composite primary key (more
than one primary key). When a GET request is made to the REST API, parameter
"total" in the response may not be the actual number of items in the table.

> The application seems to behave as if only one primary key is used to
> differentiate items and count the total number of elements in the table.

## Configuration

- adapter: Sequelize
- database: Postgres

## Reproduce

Tests can be run with `docker compose run test-runner`.

> These tests are written in `test/services/my-service.test.js`.
