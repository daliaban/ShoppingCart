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
    this.cancelBtn = element(by.css('button.btn-default'));

    var lookupBtns = element.all(by.tagName('button.btn-info'));

    this.billingLookup = lookupBtns.get(0);
    this.shippingLookup = lookupBtns.get(1);

    this.legends = element.all(by.tagName('legend'));
    this.personalDetails = this.legends.get(0);
    this.billingDetails = this.legends.get(1);
    this.shippingDetails = this.legends.get(2);

    this.billinghouse = element(by.model('billingAddr.house'));
    this.shippinghouse = element(by.model('shippingAddr.house'));

    this.billingname = element(by.model('billingAddr.name'));
    this.shippingname = element(by.model('shippingAddr.name'));

    this.billingstreet = element(by.model('billingAddr.street'));
    this.billingcity = element(by.model('billingAddr.city'));
    this.billingcounty = element(by.model('billingAddr.county'));
    this.billingcountry = element(by.model('billingAddr.country'));

    this.shippingcity = element(by.model('shippingAddr.city'));
    this.shippingcounty = element(by.model('shippingAddr.county'));
    this.shippingcountry = element(by.model('shippingAddr.country'));

};

module.exports = new userPage();