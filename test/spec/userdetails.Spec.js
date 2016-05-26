/**
 * Created by dalia on 16/05/16.
 */

'use strict';

describe('controller:userdetailsCtrl', function() {

    beforeEach(module('shoppingCart'));
    var scope, controller, q;
    var address = [{"address_components" : [{"long_name" : "SW14 8PY","types" : [ "postal_code" ]},
        {"long_name" : "Ashleigh Road","types" : [ "route" ]},{"long_name" : "London","types" : [ "locality", "political" ]},
        {"long_name" : "London","types" : [ "postal_town" ]}, {"long_name" : "Greater London","types" : [ "administrative_area_level_2", "political" ]},
        {"long_name" : "United Kingdom","types" : [ "country", "political" ]}]}];


    //Faking post code look up could be done either of these two ways, both works

   /* beforeEach(module(function($provide){
        $provide.value('postCodeLookup', {
            lookUpAddress: function(){
                var deferred = q.defer();
                deferred.resolve(address);
                return deferred.promise;
            }
        });
    }));*/

    beforeEach(inject(function(postCodeLookup){
        spyOn(postCodeLookup, 'lookUpAddress').and.callFake(function(){
           return {
               then: function(callback){ callback(address)}
           }
        });
    }));

    //end of fake post code lookup

    beforeEach(inject(function ($controller, $rootScope, _$q_, $stateParams) {
        q = _$q_;
        scope = $rootScope.$new();
        controller = $controller('userdetailsCtrl', {
            $scope: scope,
            $stateParams: $stateParams
        });
    }));

    describe('State transition test', function(){

        it('should set state params as "cart" when no referer value is passed', inject(function($controller, $stateParams, stateManagement){
            stateManagement.clearStateParams();
            $stateParams.referer = '';

            var ctrl = $controller('userdetailsCtrl', {
                $scope: scope,
                $stateParams: $stateParams
            });
            expect(scope.referer).toBe("cart");

            var referer = stateManagement.getStateParams('stateParams');
            expect(referer).toBe('cart');
        }));

        it('should set state params with passed referer value', inject(function($controller, $stateParams, stateManagement){
            $stateParams.referer = "shipping";

            var ctrl = $controller('userdetailsCtrl', {
                $scope: scope,
                $stateParams: $stateParams
            });
            expect(scope.referer).toBe($stateParams.referer);

            var referer = stateManagement.getStateParams('stateParams');
            expect(referer).toBe($stateParams.referer);
        }));

    });

    describe('User Management test', function(){
        //These three tests should be run sequentially to manage the cookie store - first: nothing stored, second: store it and third: get the stored value
        it('should not find any user details in cookie', inject(function(userManagement){
            var user = userManagement.getUser();
            expect(user).toEqual(undefined);
            expect(scope.billingAddr).toEqual({
                name: '',
                phno: '',
                house: '',
                postcode: ''
            });
            expect(scope.shippingAddr).toEqual({
                name: '',
                phno: '',
                house: '',
                postcode: ''
            });
        }));

        it('should save user details in cookie', inject(function(userManagement){
            scope.email = 'a@gmail.com';
            scope.billingAddr = {};
            scope.shippingAddr = {};
            scope.saveUserDetails();
            var user = userManagement.getUser();
            expect(user.email).toEqual(scope.email);
            expect(user.billingAddr).toEqual(scope.billingAddr);
            expect(user.shippingAddr).toEqual(scope.shippingAddr);
        }));

        it('should get user details from cookie and set in scope', inject(function(userManagement){
            var user = userManagement.getUser();
            expect(user.email).toEqual(scope.email);
            expect(user.billingAddr).toEqual(scope.billingAddr);
            expect(user.shippingAddr).toEqual(scope.shippingAddr);
            userManagement.clearUser();
        }));
    });

    it('should set shipping address same as billing address if "same" box is ticked and vice-versa', function(){
        expect(scope.same).toBe(false);
        scope.billingAddr = {name: 'D B', phno: '77123322', house: '21', postcode: 'W60AD'};
        scope.sameAddress(scope.same);
        expect(scope.shippingAddr).toEqual(scope.billingAddr);
        scope.sameAddress(scope.same);
        expect(scope.shippingAddr).not.toEqual(scope.billingAddr);
    });

    describe('postcode lookup test', function(){
        it('should get billing address', inject(function(){
            scope.billingAddr = {name: 'D B', phno: '77123322', house: '67', street:'Overstone Road', postcode: 'W60AD'};
            var postcode = "SW148PY";
            scope.getAddress(postcode,scope.billingAddr);
            scope.$apply();

            expect(scope.billingAddr.street).toBe('Ashleigh Road');
            expect(scope.billingAddr.city).toBe('London');
            expect(scope.billingAddr.country).toBe('United Kingdom');
        }));
    });


    describe('Modal instance test', function(){
        var modalInstance, ctrl, mscope;
        var address = [{address_components: [{long_name: 700009, types:[ "postal_code" ]},{long_name: 'Sincelejo', types:[ "administrative_area_level_2", "political" ]},
            {long_name: 'Sucre', types:[ "administrative_area_level_1", "political" ]},{long_name: 'Colombia', types:[ "country", "political" ]}]},
            {address_components: [{long_name: 700009, types:[ "postal_code" ]},{long_name: 'Calcutta', types:[ "locality", "political" ]}, {long_name: 'Calcutta', types:[ "administrative_area_level_2", "political" ]},
                {long_name: 'West Bengal', types:[ "administrative_area_level_1", "political" ]},{long_name: 'India', types:[ "country", "political" ]}]}
        ];

        beforeEach(inject(function($controller, $rootScope){
            mscope = $rootScope.$new();
            modalInstance = {
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };
            ctrl = $controller('ModalInstanceCtrl', {
                $scope: mscope,
                $uibModalInstance: modalInstance,
                items: address

            });
        }));
        it('should instanciate modal controller', function(){
            expect(ctrl).not.toBeUndefined();
        });
        it('should have multiple addresses in modal', function(){
            expect(mscope.items).toEqual(address);
        });
        it('should close the modal window with result "a" when pressed OK', function(){
            mscope.selected = {item: address[0]};
            mscope.ok();
            expect(modalInstance.close).toHaveBeenCalledWith(address[0]);
        });
        it('should dismiss the modal window when pressed Cancel', function(){
            mscope.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });
    });

    describe('Modal opening test', function(){
        var modal, scope, ctrl, modalInstance;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('userdetailsCtrl', {
                $scope: scope,
                $uibModal: modal,
                $uibModalInstance: modalInstance,
                items: address

            });
            modalInstance = {
                close: jasmine.createSpy('modalInstance.close'),
                dismiss: jasmine.createSpy('modalInstance.dismiss'),
                result: {
                    then: jasmine.createSpy('modalInstance.result.then')
                }
            };
            spyOn($uibModal, 'open').and.returnValue(modal);
            modal = {
                result: {
                    then: function (confirmCallback, cancelCallback) {
                        //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                        this.confirmCallBack = confirmCallback;
                        this.cancelCallback = cancelCallback;
                    }
                },
                close: function (item) {
                    //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
                    this.result.confirmCallBack(item);
                },
                dismiss: function (type) {
                    //The user clicked cancel on the modal dialog, call the stored cancel callback
                    this.result.cancelCallback(type);
                }
            };
        }));
        xit('should open the modal window', function(){
            scope.open();
            mscope.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });
    });

});