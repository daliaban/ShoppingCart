/**
 * Created by dalia on 26/05/16.
 */
'use strict';
angular.module('shoppingCart')
    .factory('shopStorage', function($localStorage){

        return {
            setData: function(key, data){
                $localStorage[key] = data;
            },
            getData: function(key){
                return $localStorage[key];
            },
            removeData: function(key){
                delete $localStorage[key];
            },
            clear: function(){
                $localStorage = {};
            }
        }
    });