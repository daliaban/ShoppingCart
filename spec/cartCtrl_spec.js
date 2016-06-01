/**
 * Created by dalia on 31/05/16.
 */
'use strict';

describe('Cart Page', function(){
    var mainPage = require('./pages/main_page.js');
    var cartPage = require('./pages/cart_page.js');

    beforeEach(function(){
    });

    it('should show empty cart message', function(){
        cartPage.navigate();
        expect(element(by.css('#emptycart h4')).getText()).toEqual('Your cart is empty');
        expect(element(by.css('#emptycart a')).getText()).toEqual('<< Continue Shopping');
    });
});