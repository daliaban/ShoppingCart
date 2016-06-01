/**
 * Created by dalia on 31/05/16.
 */
'use strict';
var mainPage = function(){
    this.navigate = function(){
        browser.get('#/main');
    };

    this.addToCart = function(index){
        var el1 = element.all(by.repeater('item in datalist.paged')).get(index);
        el1.element(by.className('btn-primary')).click();
    };

    this.next = function(){
        element(by.id('next')).click();
    };

};

module.exports = new mainPage();