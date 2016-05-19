/**
 * Created by dalia on 10/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .directive('dirFooter', function(){
        return {
            templateUrl: 'view/partials/footer.html',
            restrict: 'A',
            controller: 'footerCtrl'
        }
});

