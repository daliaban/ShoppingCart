/**
 * Created by dalia on 03/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('userdetailsCtrl',function($scope, $stateParams, $uibModal, postCodeLookup, userManagement, stateManagement){

        var params = $stateParams.referer;
        if (params){
            $scope.referer = params;
            stateManagement.setStateParams(params);
        }else {
            var referer = stateManagement.getStateParams('stateParams');
            if (referer){
                $scope.referer = referer;
            }else{
                stateManagement.setStateParams('cart');
                $scope.referer = 'cart';
            }
        }

        var user = userManagement.getUser();
        if (user){
            $scope.email = user.email;
            $scope.billingAddr = user.billingAddr;
            $scope.shippingAddr = user.shippingAddr;
        }else {
            $scope.billingAddr = {
                name: '',
                phno: '',
                house: '',
                postcode: ''
            };
            $scope.shippingAddr = {
                name: '',
                phno: '',
                house: '',
                postcode: ''
            };
        }
        $scope.same = false;

        $scope.sameAddress = function(same){
            $scope.same = !same;
            if ($scope.same){
                $scope.shippingAddr = $scope.billingAddr;
            }else {
                $scope.shippingAddr = {};
            }
        };

        function defaultIt(AddrDict){
            angular.forEach(AddrDict, function(value, key){
               if (key != 'house'  && key != 'postcode' && key != 'name' && key != 'phno'){
                   AddrDict[key] = '';
               }
            });
        }

        function splitAddress(address, addType){
            angular.forEach(address.address_components, function(value) {
                if (value.types[0] == 'route'){
                    addType.street = value.long_name;
                }
                if (value.types[0] == 'locality'){
                    addType.city = value.long_name;
                }
                if (value.types[0] == 'postal_town'){
                    addType.city = value.long_name;
                }
                if (value.types[0] == 'country'){
                    addType.country = value.long_name;
                }
                if (value.types[0] == 'administrative_area_level_1'){
                    addType.state = value.long_name;
                }
                if (value.types[0] == 'administrative_area_level_2'){
                    addType.county = value.long_name;
                }
            });
            addType.fullAddr = address.formatted_address;
        }

        $scope.getAddress = function(postcode, addrType){
            defaultIt(addrType);
            postCodeLookup.lookUpAddress(postcode)
                .then(function(addresses){
                    if (addresses.length == 1){
                        splitAddress(addresses[0], addrType);
                    }else {
                        var modalInstance = $uibModal.open({
                            animation:true,
                            templateUrl: '../view/pick-address.html',
                            controller: 'ModalInstanceCtrl',
                            resolve: {
                                items: function(){
                                    return addresses
                                }
                            }
                        });
                        modalInstance.result.then(function (selectedItem){
                            splitAddress(selectedItem, addrType);
                        });
                    }
                });
        };

        $scope.saveUserDetails = function(){
            var userData = {
                email: $scope.email,
                billingAddr: $scope.billingAddr,
                shippingAddr: $scope.shippingAddr || $scope.billingAddr
            };
            userManagement.saveUser(userData);
        }

});
