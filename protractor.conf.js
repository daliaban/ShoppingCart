/**
 * Created by dalia on 26/05/16.
 */

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec/cartCtrl_spec.js'],
    capabilities: {
        'browserName': 'chrome'
    },
    //A base URL for your application under test. Calls to protractor.get() with relative paths will be prepended with this
    baseUrl: 'http://0.0.0.0:9000'
};
