const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //video: true,
  //screenshotOnRunFailure: true,
  allowCypressEnv: false,

  e2e: {
    defaultCommandTimeout: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
