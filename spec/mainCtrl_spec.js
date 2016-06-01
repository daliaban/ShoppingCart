/**
 * Created by dalia on 31/05/16.
 */
'use strict';

describe('Main Page', function(){
    var mainPage = require('./pages/main_page.js');
    beforeEach(function(){
        mainPage.navigate();
    });
    it('should have a title', function(){
        expect(browser.getTitle()).toEqual('Fruits Shopping Site');
    });
    it('should have zero elements in cart', function(){
        expect(element(by.binding('cartLength')).getText()).toEqual('Cart (0)');
    });
    it('should show 5 rows in the table', function(){
        var count = element.all(by.repeater('item in datalist.paged')).count();
        expect(count).toBe(5);
    });
    it('should add items in cart', function(){
        mainPage.addToCart(0);
        expect(element(by.binding('cartLength')).getText()).toEqual('Cart (1)');
        mainPage.addToCart(1);
        expect(element(by.binding('cartLength')).getText()).toEqual('Cart (2)');
    });

    it('should disable the Prev button and enable Next button on first page', function(){
        expect(element(by.id('prev')).isEnabled()).toBe(false);
        expect(element(by.id('next')).isEnabled()).toBe(true);
        expect(element(by.binding('pagingOptions.totalPages')).getText()).toEqual('Page 1 of 4');
    });
    it('should enable both Prev and Next button on second and third page', function(){
        mainPage.next();
        expect(element(by.id('prev')).isEnabled()).toBe(true);
        expect(element(by.id('next')).isEnabled()).toBe(true);
        expect(element(by.binding('pagingOptions.totalPages')).getText()).toEqual('Page 2 of 4');
        mainPage.next();
        expect(element(by.id('prev')).isEnabled()).toBe(true);
        expect(element(by.id('next')).isEnabled()).toBe(true);
        expect(element(by.binding('pagingOptions.totalPages')).getText()).toEqual('Page 3 of 4');
    });
    it('should disable the Next button and enable Prev button on last page', function(){
        mainPage.next();
        mainPage.next();
        mainPage.next();
        expect(element(by.id('prev')).isEnabled()).toBe(true);
        expect(element(by.id('next')).isEnabled()).toBe(false);
        expect(element(by.binding('pagingOptions.totalPages')).getText()).toEqual('Page 4 of 4');
    });
    it('should take to cart page while clicking on Cart link', function(){
        element(by.binding('cartLength')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/cart');
    });
    it('should take to cart page while clicking on Proceed To Checkout button', function(){
        element(by.id('checkout')).click();
        expect(browser.getCurrentUrl()).toEqual('http://0.0.0.0:9000/#/cart');
    });
});