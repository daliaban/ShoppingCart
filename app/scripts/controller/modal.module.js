/**
 * Created by dalia on 05/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, items){
        $scope.items = items;

        $scope.selected = {};

        $scope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ok = function(){
            $uibModalInstance.close($scope.selected.item);
        };

});
