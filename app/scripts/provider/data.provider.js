/**
 * Created by dalia on 09/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .provider('data', function(){
        this.datalist = [
            {name: 'Apple', price: 3.00},
            {name: 'Banana', price: 2.00},
            {name: 'Pear', price: 1.00},
            {name: 'Watermelon', price: 1.50},
            {name: 'Papaya', price: 2.99},
            {name: 'Kiwi', price: 3.99},
            {name: 'Grapes', price: 2.50},
            {name: 'Jackfruits', price: 1.00},
            {name: 'Mango', price: 1.50},
            {name: 'Coconut', price: 2.99},
            {name: 'Strawberries', price: 3.99},
            {name: 'Blackberries', price: 5.67},
            {name: 'Blueberries', price: 1.56},
            {name: 'Raspberries', price: 1.50},
            {name: 'Guava', price: 2.99},
            {name: 'Plum', price: 2.78},
            {name: 'Peach', price: 2.99},
            {name: 'Melon', price: 1.59},
            {name: 'Pineapple', price: 1.50},
            {name: 'Oranges', price: 2.90}
        ];

        //option to set the data from a database, hence this is kept as a provider so that it can be set with data from backend
        //this.setData = function(data){
        //    this.datalist = data;
        //};

        this.$get = function() {
            var datalist = this.datalist;
            return {
                getData: function() {
                    return datalist;
                }
            };
        }
});
