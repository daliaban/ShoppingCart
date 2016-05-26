/**
 * Created by dalia on 06/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .factory('userManagement', function(shopStorage){
        return {
            saveUser: function(user){
                shopStorage.setData('user', user);
            },
            getUser: function(){
                return shopStorage.getData('user')
            },
            clearUser: function(){
                shopStorage.removeData('user');
            }
        }

});
