/**
 * Created by dalia on 10/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .directive('dirHeader', function(){
        return {
            templateUrl: 'view/partials/header.html',
            restrict: 'A'
        }
    });

