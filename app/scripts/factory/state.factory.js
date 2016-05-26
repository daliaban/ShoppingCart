/**
 * Created by dalia on 09/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .factory('stateManagement', function(shopStorage){

        return {
            setStateParams: function(params){
                shopStorage.setData('stateParams', params);
            },
            getStateParams: function(){
                return shopStorage.getData('stateParams');
            },
            clearStateParams: function(){
                shopStorage.removeData('stateParams');
            }
        }

});
