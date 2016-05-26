/**
 * Created by dalia on 26/04/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('cartCtrl', function($scope, $state, cart, userManagement){
        $scope.datalist =  cart.getCart();
        $scope.totalToPay = cart.cartValue();

        $scope.removeFromCart = function(){
            cart.removeFromCart(this.name);
            $scope.datalist =  cart.getCart();
            $scope.totalToPay = cart.cartValue();
        };

        $scope.updateQuantity = function(){
            cart.updateCart(this.name, this.item.quantity);
            $scope.datalist =  cart.getCart();
            $scope.totalToPay = cart.cartValue();
        };

        $scope.checkUserDetails = function(){
            var user = userManagement.getUser();
            if (user){
                return 'checkout.payments'
            }else {
                return 'checkout.details({referer: "cart"})'
            }
        }
});
