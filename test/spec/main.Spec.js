/**
 * Created by dalia on 13/05/16.
 */
'use strict';

describe('controller:mainCtrl', function() {

    beforeEach(module('shoppingCart'));

    var scope, controller;
    var mockedLocalStorage = {};

    beforeEach(module(function($provide){
        $provide.value("$localStorage", mockedLocalStorage);
    }));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('mainCtrl', {
            $scope: scope
        });
    }));

    it('should get data from data provider', function(){
        expect(scope.datalist).toBeTruthy();
    });

    it('should add item to cart and increase cart length', inject(function(cart){
        cart.setCart();

        var len = scope.cartLength;

        scope.item = {'name': 'Apple', 'price': 3.00};
        scope.addToCart();
        var val = cart.getCart();
        expect(val['Apple'].quantity).toBe(1);
        expect(val['Apple'].price).toBe(3.00);
        scope.$digest();
        expect(scope.cartLength).toBe(len+1);

        scope.item = {'name': 'Oranges', 'price': 2.00};
        scope.addToCart();
        var val = cart.getCart();
        expect(val['Oranges'].quantity).toBe(1);
        expect(val['Oranges'].price).toBe(2.00);
        scope.$digest();
        expect(scope.cartLength).toBe(len+2);

        scope.item = {'name': 'Apple', 'price': 3.00};
        scope.addToCart();
        var val = cart.getCart();
        expect(val['Apple'].quantity).toBe(2);
        expect(val['Apple'].price).toBe(6.00);
        scope.$digest();
        expect(scope.cartLength).toBe(len+3);

        cart.clearCart();
    }));

});