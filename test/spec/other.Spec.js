/**
 * Created by dalia on 17/05/16.
 */

'use strict';

describe('controller:misc', function() {

    beforeEach(module('shoppingCart'));

    var mockedLocalStorage = {};

    beforeEach(module(function($provide){
        $provide.value("$localStorage", mockedLocalStorage);
    }));

    describe('controller:thankyou', function(){
        var scope, item, controller, cartItem;
        beforeEach(inject(function($rootScope, $controller, cart){
            scope = $rootScope.$new();
            item = {name: 'Apple', price: 3.00};
            cart.setCart();
            cart.addToCart(item);

            controller = $controller('thankyouCtrl', {
                $scope: scope
            });
        }));

        it('should have no item in cart', inject(function(cart){
            cartItem = cart.getCart();
            expect(cartItem).toEqual({});
        }));
    });

    describe('controller:payment', function(){
        var scope, controller, user;
        beforeEach(inject(function($rootScope, $controller, userManagement){
            scope = $rootScope.$new();
            user = {email: 'd@b.c', phno: '07777722', billingAddr: {}, shippingAddr: {}};
            userManagement.saveUser(user);
            controller = $controller('paymentCtrl', {
                $scope: scope
            });
        }));

        afterEach(inject(function(userManagement) {
            userManagement.clearUser();
        }));

        it('should already have valid user details before payment', inject(function(){
            expect(scope.user).toBeTruthy();
        }));

        it('should switch to tab selected', function(){
            scope.changeTab(2);
            expect(scope.view_tab).toBe(2);
        });
    });

    describe('controller:checkout', function(){
        var scope, item, controller, cartItem, total;
        beforeEach(inject(function($rootScope, $controller, cart){
            scope = $rootScope.$new();
            item = {name: 'Apple', price: 3.00};
            cart.setCart();
            cart.addToCart(item);
            cartItem = { Apple: { price: 3.00, quantity: 1, unitprice: 3.00 } };

            controller = $controller('checkoutCtrl', {
                $scope: scope
            });
        }));
        afterEach(inject(function(cart) {
            cart.clearCart();
        }));

        it('should have no item in cart', function(){
            expect(scope.datalist).toEqual(cartItem);
        });
        it('should show total cart value', function(){
            expect(parseInt(scope.totalToPay)).toBe(3.00);
        });
    });

});

