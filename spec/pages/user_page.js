/**
 * Created by dalia on 31/05/16.
 */
'use strict';
var userPage = function(){
    this.navigate = function(){
        browser.get('#/checkout/details');
    };

    this.fillpersonal = function(){
        element(by.model('email')).sendKeys('Dalia.Ban@gmail.com');
    };

    this.fillbilling = function(){
        element(by.model('billingAddr.name')).sendKeys('Dalia Banerjee');
        element(by.model('billingAddr.phno')).sendKeys('4938383839');
        element(by.model('billingAddr.house')).sendKeys('81');
        element(by.model('billingAddr.postcode')).sendKeys('SW148PY');
    };

    this.fillshipping = function(){
        element(by.model('shippingAddr.name')).sendKeys('S K Banerjee');
        element(by.model('shippingAddr.phno')).sendKeys('7873456789');
        element(by.model('shippingAddr.house')).sendKeys('63E');
        element(by.model('shippingAddr.postcode')).sendKeys('700009');
    };

    this.samebilling = function(){
        element(by.id('sameB')).click();
    };

    this.submitBtn = element(by.className('btn-success'));

    this.billingLookup = element(by.id('bLookup'));

    this.shippingLookup = element(by.id('sLookup'));

};

module.exports = new userPage();