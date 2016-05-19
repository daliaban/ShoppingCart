/**
 * Created by dalia on 28/04/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('checkoutCtrl', function($scope, cart){
        $scope.datalist =  cart.getCart();
        $scope.totalToPay = cart.cartValue();
});
