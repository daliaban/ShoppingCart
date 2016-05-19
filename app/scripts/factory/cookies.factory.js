/**
 * Created by dalia on 28/04/16.
 */
'use strict';
angular.module('shoppingCart')
    .factory('shopCookies', function($cookies){

        return {
            setCookieData: function(key, data){
                $cookies.putObject(key,data);
            },
            getCookieData: function(key){
                return $cookies.getObject(key);
            },
            clearCookieData: function(key){
                $cookies.remove(key);
            }
        }
});