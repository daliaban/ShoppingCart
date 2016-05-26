/**
 * Created by dalia on 26/04/16.
 */
'use strict';

angular.module('shoppingCart')
    .factory('cart', function(shopStorage){

        return {
                setCart: function () {
                    var cartval = shopStorage.getData('cart');
                    this.cart = cartval || {};
                },
                getCart: function () {
                    return this.cart;
                },
                addToCart: function (item) {
                    var cart = this.cart;
                    var entity = {};
                    if (item.name in cart) {
                        cart[item.name].quantity += 1;
                        cart[item.name].price += item.price;
                    } else {
                        entity['price'] = item.price;
                        entity['quantity'] = 1;
                        entity['unitprice'] = item.price;
                        cart[item.name] = entity;
                    }
                    shopStorage.setData('cart', cart);
                },
                cartLength: function () {
                    var cart = this.cart;
                    var length = 0;
                    for (var key in cart) {
                        length += parseInt(cart[key].quantity);
                    }
                    return length;
                },
                updateCart: function (name, quantity) {
                    var cart = this.cart;
                    if (name in cart) {
                        cart[name].quantity = quantity;
                        cart[name].price = (cart[name].unitprice * parseInt(quantity));
                    }
                    shopStorage.setData('cart', cart);
                },
                removeFromCart: function (item) {
                    var cart = this.cart;
                    delete cart[item];
                    shopStorage.setData('cart', cart);
                },
                cartValue: function () {
                    var cart = this.cart;
                    var value = 0;
                    for (var key in cart) {
                        value += parseFloat(cart[key].price);
                    }
                    return value.toFixed(2);
                },
                clearCart: function(){
                    this.cart = {};
                    shopStorage.removeData('cart');
                }
            };
});