/**
 * Created by dalia on 17/05/16.
 */

'use strict';

describe('directive: footer', function(){
    beforeEach(module('shoppingCart'));
    beforeEach(preloadTpl('view/partials/footer.html'));

    var scope, direlement, element;
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        direlement = angular.element('<div dir-footer></div>');
        element = $compile(direlement)(scope);
        scope.$digest();
    }));

    it('should show the footer elements', function(){
        expect(element.html()).toContain('Powered by Dalia Banerjee');
        expect(element.html()).toContain('Feedback');
    });
});