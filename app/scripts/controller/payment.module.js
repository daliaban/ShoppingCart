/**
 * Created by dalia on 29/04/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('paymentCtrl', function($scope, userManagement){

        $scope.user = userManagement.getUser();

        $scope.changeTab = function(tab){
            $scope.view_tab = tab;
        }
});
