/**
 * Created by dalia on 19/04/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('mainCtrl', function($scope,$state,cart,data){
        $scope.datalist = data.getData();
        $scope.cartLength = cart.cartLength();

        $scope.addToCart = function(){
            cart.addToCart(this.item);
            $scope.cartLength = cart.cartLength();
        };

        $scope.pagingOptions = {curPage: 0, pageSize: 5, totalPages:0 };
});
