/**
 * Created by dalia on 31/05/16.
 */
'use strict';
var cartPage = function(){
    this.navigate = function(){
        browser.get('#/cart');
    }
};

module.exports = new cartPage();