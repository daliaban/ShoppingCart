/**
 * Created by dalia on 03/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .factory('postCodeLookup', function($http, $q){

        return {
            lookUpAddress: function(postcode){
                var url= 'http://maps.googleapis.com/maps/api/geocode/json?address='+postcode+'&sensor=false';
                var deferred = $q.defer();
                $http.get(url)
                    .then(
                        function(response){
                            deferred.resolve(response.data.results);
                        },
                        function(httpError){
                            deferred.reject(httpError);
                        });
                return deferred.promise;
            }
        }

});
