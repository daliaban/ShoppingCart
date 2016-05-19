/**
 * Created by dalia on 09/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .factory('stateManagement', function(shopCookies){

        return {
            setStateParams: function(params){
                shopCookies.setCookieData('stateParams', params);
            },
            getStateParams: function(){
                return shopCookies.getCookieData('stateParams');
            },
            clearStateParams: function(){
                shopCookies.clearCookieData('stateParams');
            }
        }

});
