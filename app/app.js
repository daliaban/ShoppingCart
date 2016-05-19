/**
 * Created by dalia on 19/04/16.
 */
'use strict';

angular.module('shoppingCart', ['ui.router','ngCookies', 'ui.bootstrap'])
    .config(function($stateProvider, $urlRouterProvider, dataProvider, dataGenProvider){
        $urlRouterProvider.otherwise('/main');

        $stateProvider.state('main', {
            url: '/main',
            templateUrl: '../view/main-section.html',
            controller: 'mainCtrl'
        }).state('cart', {
            url: '/cart',
            templateUrl: '../view/cart-section.html',
            controller: 'cartCtrl'
        }).state('checkout', {
            abstract: true,
            url: '/checkout',
            controller: 'checkoutCtrl',
            templateUrl: '../view/checkout-section.html'
        }).state('checkout.details',{
            url: '/details',
            templateUrl: '../view/userdetails-section.html',
            controller: 'userdetailsCtrl',
            params: {
                referer: {
                    value: ''
                }
            }
        }).state('checkout.payments', {
            url: '/payments',
            templateUrl: '../view/payments-section.html',
            controller: 'paymentCtrl'

        }).state('thankyou', {
            url: '/done',
            templateUrl: '../view/thankyou.html',
            controller: 'thankyouCtrl'
        });

        var data = dataGenProvider.generateData();
        dataProvider.setData(data);

}).run(function(cart){
        cart.setCart();
    });