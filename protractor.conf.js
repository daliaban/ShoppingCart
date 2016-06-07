/**
 * Created by dalia on 26/05/16.
 */
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec/*_spec.js'],
    capabilities: {
        'browserName': 'chrome'
    },
    //A base URL for your application under test. Calls to protractor.get() with relative paths will be prepended with this
    baseUrl: 'http://0.0.0.0:9000',

    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'protractor_output',
                takeScreenshotsOnlyOnFailures: true
            })
        );
    }
};
