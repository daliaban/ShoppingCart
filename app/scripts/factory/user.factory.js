/**
 * Created by dalia on 06/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .factory('userManagement', function(shopCookies){
        return {
            saveUser: function(user){
                shopCookies.setCookieData('user', user);
            },
            getUser: function(){
                return shopCookies.getCookieData('user')
            },
            clearUser: function(){
                shopCookies.clearCookieData('user');
            }
        }

});
