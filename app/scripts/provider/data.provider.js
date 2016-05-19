/**
 * Created by dalia on 09/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .provider('data', function(){
        this.datalist = [];

        this.setData = function(data){
            this.datalist = data;
        };

        this.$get = function() {
            var datalist = this.datalist;
            return {
                getData: function() {
                    return datalist;
                }
            };
        }
});
