/**
 * Created by dalia on 18/05/16.
 */
'use strict';

describe('factory:postcode', function() {

    beforeEach(module('shoppingCart'));
    var scope;
    var postcode = 'SW148PY';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+postcode+'&sensor=false';
    var address = [{"address_components" : [{"long_name" : "SW14 8PY","types" : [ "postal_code" ]},
        {"long_name" : "Ashleigh Road","types" : [ "route" ]},{"long_name" : "London","types" : [ "locality", "political" ]},
        {"long_name" : "London","types" : [ "postal_town" ]}, {"long_name" : "Greater London","types" : [ "administrative_area_level_2", "political" ]},
        {"long_name" : "United Kingdom","types" : [ "country", "political" ]}]}];


    describe('testing with httpBackend', function(){
       beforeEach(inject(function($controller, $rootScope){
           scope = $rootScope.$new();
       }));

        it('should get address in success', inject(function($httpBackend, postCodeLookup){
            $httpBackend.expectGET(url).respond(200, {results: address});

            postCodeLookup.lookUpAddress(postcode).then(function(response){
                expect(response).toEqual(address);
            });

            $httpBackend.flush();

        }));

        it('should throw error in failure', inject(function($httpBackend, postCodeLookup){
            $httpBackend.expectGET(url).respond(400, {});

            postCodeLookup.lookUpAddress(postcode).then(function(response){
                expect(true).toBe(false);
            },
            function(httpError){
                expect(httpError.status).toBe(400);
            });

            $httpBackend.flush();

        }));

    });
});