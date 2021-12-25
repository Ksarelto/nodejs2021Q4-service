# RS School REST service

## Logging

- In this application is implemented logging. The logging object is located in **src/logging/winston.log.ts**;
- All logs are written to the file **all.txt**, the error logs are written to the file **error.txt**. Log files are located in **src/logging/logs**.
- You can set the logging level. If you want it, you should change the enviroment variable _LOGGING_LEVEL_ in the file **.env**.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Checkout to develop branch

```
git checkout develop-REST-service-typescript
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Testing

Before start testing, you must run server using command

```
npm start
```

After application running open new terminal and enter:

To run all tests:

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

## Usage

If you want to test an application by yourself, you can use testing API application like <kbd>Postman</kbd>.

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
