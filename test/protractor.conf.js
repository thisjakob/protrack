var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar', // Make use you check the version in the folder

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['test/e2e/main.js'],
    onPrepare: function () {
        jasmine.getEnv().addReporter(
            new HtmlScreenshotReporter({
                dest: 'test/report/e2e',
                filename: 'e2eReport.html',
                preserveDirectory: true
            })
        );
    },
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: false,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    }
};
