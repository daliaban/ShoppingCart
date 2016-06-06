/**
 * Created by dalia on 02/06/16.
 */
'use strict';

describe('User Page', function() {
    var userPage = require('./pages/user_page.js');

    beforeEach(function(){
        userPage.navigate();
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

        expect(element(by.model('shippingAddr.house')).getAttribute('value')).toEqual(element(by.model('billingAddr.house')).getAttribute('value'));
        expect(element(by.model('shippingAddr.name')).getAttribute('value')).toEqual(element(by.model('billingAddr.name')).getAttribute('value'));
    });

    it('should clear shipping address when checkbox is not ticked', function(){
        userPage.fillbilling();
        userPage.samebilling(); //To check
        userPage.samebilling(); //To uncheck

        expect(element(by.model('shippingAddr.house')).getAttribute('value')).toEqual('');
        expect(element(by.model('shippingAddr.name')).getAttribute('value')).toEqual('');
    });

    it('Look Up should fill in address', function(){
        userPage.fillbilling();
        userPage.billingLookup.click();
        //browser.pause();

        expect(element(by.model('billingAddr.street')).getAttribute('value')).toEqual('Ashleigh Road');
        expect(element(by.model('billingAddr.city')).getAttribute('value')).toEqual('London');
        expect(element(by.model('billingAddr.county')).getAttribute('value')).toEqual('Greater London');
        expect(element(by.model('billingAddr.country')).getAttribute('value')).toEqual('United Kingdom');

    });

    it('should be able to cancel address selection', function(){
        userPage.fillshipping();
        userPage.shippingLookup.click();

        element(by.id('2')).click();
        element(by.css('button.btn-warning')).click();

        expect(element(by.model('shippingAddr.city')).isDisplayed()).toBeFalsy();
        expect(element(by.model('shippingAddr.county')).isDisplayed()).toBeFalsy('');
        expect(element(by.model('shippingAddr.country')).isDisplayed()).toBeFalsy('');

    });

    it('Look Up should open pop up', function(){
        userPage.fillshipping();
        userPage.shippingLookup.click();

        element(by.id('2')).click();
        element(by.css('button.btn-primary')).click();

        expect(element(by.model('shippingAddr.city')).getAttribute('value')).toEqual('Calcutta');
        expect(element(by.model('shippingAddr.county')).getAttribute('value')).toEqual('Calcutta');
        expect(element(by.model('shippingAddr.country')).getAttribute('value')).toEqual('India');

    });

    it('Should be able to cancel user details page', function(){
        element(by.css('button.btn-default')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/cart');
    });

    it('should be able to continue shopping', function(){
        element(by.tagName('div.totalwidget a')).click();
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