/**
 * Created by dalia on 07/06/16.
 */
'use strict';

describe('Payments Page', function() {
    var userPage = require('./pages/user_page.js');
    var payPage = require('./pages/payment_page.js');

    beforeEach(function(){
        payPage.navigate();
    });

    it('should be able to Edit billing address', function(){
        payPage.billingEdit.click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/checkout/details');

        expect(userPage.legends.count()).toEqual(3);
        expect(userPage.personalDetails.isDisplayed()).toBeTruthy();
        expect(userPage.personalDetails.getText()).toEqual('Personal Details');
        expect(userPage.billingDetails.isDisplayed()).toBeTruthy();
        expect(userPage.billingDetails.getText()).toEqual('Billing Address');
        expect(userPage.shippingDetails.isDisplayed()).toBeFalsy();
    });

    it('should be able to Edit shipping address', function(){
        payPage.shippingEdit.click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/checkout/details');

        expect(userPage.legends.count()).toEqual(3);
        expect(userPage.personalDetails.isDisplayed()).toBeFalsy();
        expect(userPage.billingDetails.isDisplayed()).toBeFalsy();
        expect(userPage.shippingDetails.isDisplayed()).toBeTruthy();
        expect(userPage.shippingDetails.getText()).toEqual('Shipping Address');

    });

    it('Should be able to Pay by Credit/Debit Card', function(){
        payPage.cardTab.click();
        expect(payPage.paypalPay.isDisplayed()).toBeFalsy();
        expect(payPage.cardPay.isDisplayed()).toBeTruthy();
        expect(payPage.cardPayBtn.isEnabled()).toBe(false);

        payPage.fillCardDetails();
        expect(payPage.cardPayBtn.isEnabled()).toBe(true);

        payPage.cardPayBtn.click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/done');
    });

    it('Should be able to pay by Paypal', function(){
        payPage.paypalTab.click();
        expect(payPage.cardPay.isDisplayed()).toBeFalsy();
        expect(payPage.paypalPay.isDisplayed()).toBeTruthy();
        expect(payPage.paypalPayBtn.isEnabled()).toBe(false);

        payPage.fillPaypalDetails();
        expect(payPage.paypalPayBtn.isEnabled()).toBe(true);

        payPage.paypalPayBtn.click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/done');
    });

    it('should be able to continue shopping', function(){
        element(by.linkText('<< Continue Shopping')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/main');
    });

    it('should be able to continue shopping from Done page', function(){
        browser.get('#/done');
        element(by.linkText('<< Continue Shopping')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/main');
    });

});