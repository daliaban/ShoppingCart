/**
 * Created by dalia on 07/06/16.
 */
'use strict';
var payPage = function() {
    this.navigate = function () {
        browser.get('#/checkout/payments');
    };

    var editBtns = element.all(by.tagName('button.btn-warning'));

    this.billingEdit = editBtns.get(0);
    this.shippingEdit = editBtns.get(1);

    var tablist = element.all(by.tagName('ul.nav li'));
    this.cardTab = tablist.get(0);
    this.paypalTab = tablist.get(1);

    this.cardPay = element(by.name('Card'));
    this.paypalPay = element(by.name('paypal'));

    var payBtns = element.all(by.tagName('button.btn-danger'));
    this.cardPayBtn = payBtns.get(0);
    this.paypalPayBtn = payBtns.get(1);

    this.fillCardDetails = function(){
        element(by.id('typeC')).sendKeys('Visa');
        element(by.id('cNumber')).sendKeys('4938383839676895');
        element(by.id('expiry')).sendKeys('12/2020');
        element(by.id('cvv')).sendKeys('123');
    };

    this.fillPaypalDetails = function(){
        element(by.id('uid')).sendKeys('Dalia Banerjee');
        element(by.id('password')).sendKeys('abcd');
    };

};

module.exports = new payPage();