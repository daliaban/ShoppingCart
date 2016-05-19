/**
 * Created by dalia on 06/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .controller('thankyouCtrl', function(cart){
        cart.clearCart();
});
