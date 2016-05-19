/**
 * Created by dalia on 12/05/16.
 */

'use strict';

angular.module('shoppingCart')
    .controller('footerCtrl',function($scope,$uibModal){

        $scope.giveFeedback = function(){
            var modalInstance = $uibModal.open({
                animation:true,
                templateUrl: '../view/feedback.html',
                controller: 'feedbackCtrl'
            });
            modalInstance.result.then(function (feedBack){
                console.log(feedBack);
                //I intend to implement the emailing functionality with node - express.js in future version
            });
        }

});
