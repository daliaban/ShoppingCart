/**
 * Created by dalia on 02/06/16.
 */
'use strict';

describe('User Page', function() {
    var userPage = require('./pages/user_page.js');

    beforeEach(function(){
        userPage.navigate();
    });
    afterEach(function(){
        browser.executeScript('window.localStorage.clear();');
    });

    it('should have disabled Submit button', function(){
        expect(userPage.submitBtn.isEnabled()).toBe(false);
    });
    it('Should save user details', function(){
        userPage.fillpersonal();
        userPage.fillbilling();
        userPage.fillshipping();
        expect(userPage.submitBtn.isEnabled()).toBe(true);
    });

    it('should copy billing address to shipping address', function(){
        userPage.fillbilling();
        userPage.samebilling();
        //https://github.com/angular/protractor/issues/323 -GetText() not working on input elements
        expect(userPage.shippinghouse.getAttribute('value')).toEqual(userPage.billinghouse.getAttribute('value'));
        expect(userPage.shippingname.getAttribute('value')).toEqual(userPage.billingname.getAttribute('value'));
    });

    it('should clear shipping address when checkbox is not ticked', function(){
        userPage.fillbilling();
        userPage.samebilling(); //To check
        userPage.samebilling(); //To uncheck

        expect(userPage.shippinghouse.getAttribute('value')).toEqual('');
        expect(userPage.shippingname.getAttribute('value')).toEqual('');
    });

    it('Look Up should fill in address', function(){
        userPage.fillbilling();
        userPage.billingLookup.click();
        //browser.pause();

        expect(userPage.billingstreet.getAttribute('value')).toEqual('Ashleigh Road');
        expect(userPage.billingcity.getAttribute('value')).toEqual('London');
        expect(userPage.billingcounty.getAttribute('value')).toEqual('Greater London');
        expect(userPage.billingcountry.getAttribute('value')).toEqual('United Kingdom');

    });

    it('should be able to cancel address selection', function(){
        userPage.fillshipping();
        userPage.shippingLookup.click();

        element(by.id('2')).click();
        element(by.css('button.btn-warning')).click();

        expect(userPage.shippingcity.isDisplayed()).toBeFalsy();
        expect(userPage.shippingcounty.isDisplayed()).toBeFalsy('');
        expect(userPage.shippingcountry.isDisplayed()).toBeFalsy('');

    });

    it('Look Up should open pop up', function(){
        userPage.fillshipping();
        userPage.shippingLookup.click();

        element(by.id('2')).click();
        element(by.css('button.btn-primary')).click();

        expect(userPage.shippingcity.getAttribute('value')).toEqual('Calcutta');
        expect(userPage.shippingcounty.getAttribute('value')).toEqual('Calcutta');
        expect(userPage.shippingcountry.getAttribute('value')).toEqual('India');

    });

    it('Should be able to cancel user details page', function(){
        userPage.cancelBtn.click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/cart');
    });

    it('should be able to continue shopping', function(){
        element(by.linkText('<< Continue Shopping')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/main');
    });

    it('should be able to save user and proceed to checkout page', function(){
        userPage.fillpersonal();
        userPage.fillbilling();
        userPage.fillshipping();
        userPage.submitBtn.click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/checkout/payments');
    });

});