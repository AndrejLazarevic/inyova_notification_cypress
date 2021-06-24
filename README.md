# Inyova Notification Center automation in Cypress 

Frontend UI testing was done in Cypress.

The base url in cypress.json is set to http://localhost:4200/ so that project from [Notification center](https://github.com/imoutaharik/angular-notification-center#notifications-center) can be
tested once run on a dev server.

All test files are located in cypress/integration folder. There is one file for tests on homepage and another one for tests on notification center page. DOM selectors are stored 
in selectors.js under cypress/support folder and imported in test files for use. 

Under cypress/videos you can find video records of all tests run.

API testing was done in Postman. You can find exported collection and environment under postman folder. Simply import them in Postman application.
