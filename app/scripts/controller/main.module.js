/**
 * Created by dalia on 19/04/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('mainCtrl', function($scope,$state,cart,data){
        $scope.datalist = data.getData();

        $scope.addToCart = function(){
            cart.addToCart(this.item);
        };

        $scope.$watch(function(){
            $scope.cartLength = cart.cartLength();
        });

});
