*Saucedemo Cypress Automation Assignment*

*Execute tests*

npx cypress open

Execute the Cypress via commandline

npx cypress run

Executes all tests in the Chrome browser and generates a Mochawesome report.

npm test

Execute tests in browser

npx cypress run --browser firefox

Execute a specific test file
Without Report

npx cypress run --spec cypress/e2e/test/InClassActivities/activity4.cy.js

OR

With Report

npm run test:spec cypress/e2e/test/InClassActivities/activity4.cy.js