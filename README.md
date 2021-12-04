# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Checkout to develop branc

```
git checkout develop-REST-service
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

### Auto-fix and format

If you want to find and fix problems in JavaScript code you should run command:

```
npm run lint
```
