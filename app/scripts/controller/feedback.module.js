/**
 * Created by dalia on 12/05/16.
 */

'use strict';

angular.module('shoppingCart')
    .controller('feedbackCtrl',function($scope,$uibModalInstance){
        $scope.feedback = {'name': '', 'email': '', 'details': ''};

        $scope.cancel = function(){
            $uibModalInstance.dismiss('cancel');
        };

        $scope.ok = function(){
            $uibModalInstance.close($scope.feedback);
        };
});