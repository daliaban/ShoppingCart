/**
 * Created by dalia on 18/05/16.
 */
'use strict';

describe('directive: header', function(){
    beforeEach(module('shoppingCart'));
    beforeEach(preloadTpl('view/partials/header.html'));

    var scope, direlement, element;
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        direlement = angular.element('<div dir-header></div>');
        element = $compile(direlement)(scope);
        scope.$digest();
    }));

    it('should show the header elements', function(){
        expect(element.html()).toContain('Fruits Shopping Site');
    });
});