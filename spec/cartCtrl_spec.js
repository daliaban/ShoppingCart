/**
 * Created by dalia on 31/05/16.
 */
'use strict';

describe('Cart Page', function(){
    var mainPage = require('./pages/main_page.js');
    var cartPage = require('./pages/cart_page.js');


    it('should show empty cart message', function(){
        cartPage.navigate();
        expect(element(by.css('#emptycart h4')).getText()).toEqual('Your cart is empty');
        expect(element(by.css('#emptycart a')).getText()).toEqual('<< Continue Shopping');
    });
    it('should show added items in cart', function(){
        mainPage.navigate();
        mainPage.addToCart(0);
        cartPage.navigate();

        expect(element.all(by.repeater('(name, item) in datalist')).count()).toEqual(1);
        browser.executeScript('window.localStorage.clear();');
    });
    it('should show correct Total To Pay', function(){
        var elements, firstrow, secondrow, firstelm, secondelm;
        mainPage.navigate();
        mainPage.addToCart(0);
        mainPage.addToCart(1);
        cartPage.navigate();

        elements = element.all(by.repeater('(name, item) in datalist'));
        expect(elements.count()).toEqual(2);
        expect(elements.get(0).all(by.tagName('td')).count()).toBe(6);

        firstrow = elements.get(0);
        firstelm = firstrow.all(by.tagName('td')).get(4).getText();

        secondrow = elements.get(1);
        secondelm = secondrow.all(by.tagName('td')).get(4).getText();

        expect(firstelm).toMatch('£3.00');
        expect(secondelm).toMatch('£2.00');
        expect(element(by.binding('totalToPay')).getText()).toBe('£5.00');
        browser.executeScript('window.localStorage.clear();');
    });

    it('should update item quantity', function(){
        mainPage.navigate();
        mainPage.addToCart(0);
        cartPage.navigate();

        var row = element.all(by.repeater('(name, item) in datalist')).get(0);
        var inputq = element(by.model('item.quantity'));
        var button =  row.all(by.tagName('td button.btn-warning'));

        inputq.clear().then(function(){
            inputq.sendKeys('5')
        });
        button.click();

        expect(row.all(by.tagName('td')).get(4).getText()).toBe('£15.00');
        expect(element(by.binding('totalToPay')).getText()).toBe('£15.00');
    });

    it('should remove item from cart', function(){
        var elements, row, elm;
        mainPage.navigate();
        mainPage.addToCart(0);
        mainPage.addToCart(1);
        cartPage.navigate();

        elements = element.all(by.repeater('(name, item) in datalist'));
        expect(elements.count()).toEqual(2);
        row = elements.get(0);
        elm = row.all(by.tagName('td button.btn-primary'));
        elm.click();
        expect(elements.count()).toEqual(1);
        elm.click();
        expect(elements.count()).toEqual(0);
        expect(element(by.css('#emptycart h4')).getText()).toEqual('Your cart is empty');
        expect(element(by.css('#emptycart a')).getText()).toEqual('<< Continue Shopping');
    });

    it('should continue shopping', function(){
        mainPage.navigate();
        mainPage.addToCart(0);
        cartPage.navigate();
        element(by.tagName('a')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/main');
    });
    it('should proceed to user details screen', function(){
        mainPage.navigate();
        mainPage.addToCart(0);
        cartPage.navigate();
        element(by.tagName('div.totalwidget button')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/checkout/details');
    });
});