/**
 * Created by dalia on 12/05/16.
 */
'use strict';

describe('controller:cartCtrl', function(){

    beforeEach(module('shoppingCart'));

    var scope, controller, cartValue, total, user;
    var item_name = "Apple";
    var item = {name: 'Apple', price: 3.00};
    var userData = {'email': 'a@gmail.com', billingAddr: {}, shippingAddr:{}};

    beforeEach(inject(function($controller, $rootScope, cart){
        scope = $rootScope.$new();
        cart.setCart();
        cart.addToCart(item);

        controller = $controller('cartCtrl', {
            $scope: scope
        });
    }));
    afterEach(inject(function(cart) {
        cart.clearCart();
    }));

    it('should get data from cart', inject(function(cart){
        cartValue = cart.getCart();
        expect(scope.datalist).toBe(cartValue);
    }));

    it('should remove item from cart', function(){
        scope.name = item_name;
        scope.removeFromCart();
        expect(scope.datalist[item_name]).toBeFalsy();
        expect(Object.keys(scope.datalist).length).toBe(0);
    });

    it('should update quantity in cart', function(){
        scope.item = item;
        scope.name = item_name;
        scope.item.quantity = 3;
        scope.updateQuantity();
        expect(scope.datalist[item_name].quantity).toBe(3);
        expect(scope.datalist[item_name].price).toBe(9.00);
    });
    it('should show the correct cart value', inject(function(cart){
        total = cart.cartValue();
        scope.$digest(); //This is needed to trigger a “digest cycle” which invokes the $watch expression
        expect(scope.totalToPay).toBe(total);
    }));

    it('should take to payments on clicking checkout if user details are present', inject(function(userManagement){
        userManagement.saveUser(userData);
        var result = scope.checkUserDetails();
        expect(result).toBe('checkout.payments');
    }));
    it('should take to details section on clicking checkout if user details are not present', inject(function(userManagement){
        userManagement.clearUser();
        var result = scope.checkUserDetails();
        expect(result).toBe('checkout.details({referer: "cart"})');
    }));

});
