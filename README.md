# Fishlog React

The Fishlog app allows the users to save information about the fish they caught. The user can search for catches and view them on a map.

## Install

Install with `npm install`.

## Start the app

First start the API. You can find the repo [here](https://github.com/Xolof/fishlog-backend).

Then, add a file .env to the project root with contents like:
`REACT_APP_API_URL="<THE_URL_OF_THE_API>"`

Start the app in dev mode with `npm run start`.

## Build

Create a production build with `npm run build`.

## Tests

There are Cypress end to end tests for the app. You need to have both this app as well as the API up and running for it to work.
Start Cypress with `npm run cypress`. Then choose the test suite `end-to-end-tests.js`. Now Cypress will run the end to end tests and you can see the testing in real time as well as the results.

## Linting

Linting can be run with `npm run lint`.