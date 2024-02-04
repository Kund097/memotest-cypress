const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        video: true,
        videoCompression: true,
        videoCompression: 15,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
