# RS School REST service

## Docker

At first check that you have already install **Docker** application, if not install it [Docker](https://www.docker.com/get-started).

#### If you want to use Docker:

- Open your IDE and run in terminal

  > git clone https://github.com/Ksarelto/nodejs2021Q4-service.git

- Run in terminal command

  > git checkout develop-REST-service-jwt

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

If you want to check reloading of container assembly, you need to change command **npm start** from **nodemon -L src/server.ts** to
**nodemon -L --exitcrash src/server.ts**

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

```
npm start
```

---

## Testing

Before start testing, you must run server using command

```
npm start
```

After application running open new terminal and enter:

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

---

## TypeDoc

If you wnat to generate typedoc documentation you should do the following:

1. Run command in command line:

```
npm run generate:docs
```

2. After coomand will generated folder docs, you need to open with liveserver file **docs/index.html**

### Auto-fix and format

If you want to find and fix problems in JavaScript code you should run command:

```
npm run lint
```
