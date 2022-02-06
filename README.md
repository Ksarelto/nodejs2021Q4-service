# RS School REST service

## Docker

At first check that you have already install **Docker** application, if not install it [Docker](https://www.docker.com/get-started).

#### If you want to use Docker:

- Open your IDE and run in terminal

  > git clone https://github.com/Ksarelto/nodejs2021Q4-service.git

- Run in terminal command

  > git checkout develop-REST-service-nest

- Run in terminal command

  > npm install

- Then run command

  > docker-compose up -d

- The server will be availavle on PORT 4000

#### If you want to test application in Docker container:

- Run application with Docker
- Run in terminal command

  > docker-compose exec app sh

- Enter command in terminal

  > npm run test:auth

---

## Logging

- In this application is implemented logging. The logging object is located in **src/logging/winston.log.ts**;
- All logs are written to the file **all.txt**, the error logs are written to the file **error.txt**. Log files are located in **src/logging/logs**.
- You can set the logging level. If you want it, you should change the enviroment variable _LOGGING_LEVEL_ in the file **.env**.

---

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Checkout to develop branch

```
git checkout develop-REST-service-jwt
```

## Installing NPM modules

```
npm install
```

## Running application

#### Before running

- If you want to use this app you need to install [PostgreSQL](https://www.postgresql.org)
- Create your own database or use default **postgres** database
- Set **POSTGRES** enviroments:

```
POSTGRES_HOST=localhost
POSTRGES_PORT={set PORT that you use for postgresql server localy}
POSTGRES_NAME={set name of postgresql user}
POSTGRES_PASSWORD={set password to your local postgresql server}
POSTGRES_DB={set name of your created database}
```

- Then you can run app

- to run application in dev mode:

```
npm run start:dev
```

- to run application in prod mode:

```
npm run start:prod
```

---

## Testing

Before start testing, you must run server using command. After that open new terminal and enter:

To run all tests:

```
npm test:auth
```

To run only one of all test suites (users, boards or tasks)

```
npm test:auth <suite name>
```

---

## Usage

If you want to test an application by yourself, you can use testing API application like <kbd>Postman</kbd>.

### Endpoints

#### Board route

```
GET /boards (get all boards)
GET /boards/:boardId (get one board by id
POST /boards (create and save one board)
PUT /boards/:boardId (find by id and update one board)
DELETE /boards/:boardId (find by id and delete one board)
```

#### User route

```
GET /users (get all users)
GET /users/:userId (get one user by id
POST /users (create and save one user)
PUT /users/:userId (find by id and update one user)
DELETE /users/:userId (find by id and delete one user)
```

#### Task route

```
GET /boards/:boardId/tasks (get all tasks)
GET /boards/:boardId/tasks/:taskId (get one task by id
POST /boards/:boardId/tasks (create and save one task)
PUT /boards/:boardId/tasks/:taskId (find by id and update one task)
DELETE /boards/:boardId/tasks/:taskId (find by id and delete one task)
```

#### Column route

```
GET /boards/:boardId/columns (get all columns)
GET /boards/:boardId/columns/:columnId (get one column by id
POST /boards/:boardId/columns (create and save one column)
PUT /boards/:boardId/columns/:columnId (find by id and update one column)
DELETE /boards/:boardId/columns/:columnId (find by id and delete one column)
```

#### File route

```
GET /files/:name (get one file by name)
POST /files (create and save one file)
```

#### Registration route

```
POST /login (login user)
POST /registration (create, registrate and save new user)
```

---

### Auto-fix and format

If you want to find and fix problems in your code you should run commands:

```
npm run lint (eslint)
npm run format (prettier)
```

## Table for performance comparison of Express and Fastify

### Express

| Title                | Legend                       | Value                              |
| -------------------- | ---------------------------- | ---------------------------------- |
| Success              | [ratio]                      | 100%                               |
| Status Codes         | [code:count]                 | 200:3000, 201:2000, 204:1000       |
| Requests             | [total, rate]                | 6000, 60/sec                       |
| Start Responses Time | [min, max, median, p95, p99] | 13, 671, 57.4, 165.7, 190.6        |
| Finish Response Time | [min, max, median, p95, p99] | 15, 693, 57.4, 165.7, 190.6        |
| Session Length       | [min, max, median, p95, p99] | 363.7, 1695.9, 424.2, 539.2, 837.3 |

--

### Fastify

| Title                | Legend                       | Value                            |
| -------------------- | ---------------------------- | -------------------------------- |
| Success              | [ratio]                      | 100%                             |
| Status Codes         | [code:count]                 | 200:3000, 201:2000, 204:1000     |
| Requests             | [total, rate]                | 6000, 60/sec                     |
| Start Responses Time | [min, max, median, p95, p99] | 12, 861, 50.9, 162.4, 186.8      |
| Finish Response Time | [min, max, median, p95, p99] | 14, 878, 50.9, 162.4, 186.8      |
| Session Length       | [min, max, median, p95, p99] | 341.8, 1915, 399.5, 459.5, 963.1 |
