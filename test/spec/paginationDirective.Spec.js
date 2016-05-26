/**
 * Created by dalia on 18/05/16.
 */

'use strict';

describe('directive: pagination', function(){
    beforeEach(module('shoppingCart'));
    beforeEach(preloadTpl('view/partials/paging.html'));

    var scope, direlement, element;
    beforeEach(inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        scope.pagingOptions = {curPage: 0, pageSize: 5, totalPages:0 };
        scope.datalist = [
            {name: 'Apple', price: 3.00},
            {name: 'Banana', price: 2.00},
            {name: 'Pear', price: 1.00},
            {name: 'Watermelon', price: 1.50},
            {name: 'Papaya', price: 2.99},
            {name: 'Kiwi', price: 3.99},
            {name: 'Grapes', price: 2.50},
            {name: 'Jackfruits', price: 1.00},
            {name: 'Mango', price: 1.50},
            {name: 'Coconut', price: 2.99},
            {name: 'Strawberries', price: 3.99},
            {name: 'Blackberries', price: 5.67},
            {name: 'Blueberries', price: 1.56},
            {name: 'Raspberries', price: 1.50},
            {name: 'Guava', price: 2.99},
            {name: 'Plum', price: 2.78},
            {name: 'Peach', price: 2.99},
            {name: 'Melon', price: 1.59},
            {name: 'Pineapple', price: 1.50},
            {name: 'Oranges', price: 2.90}
        ];
        direlement = angular.element('<div dir-paginate datalist="datalist" paging-options="pagingOptions"></div>');
        element = $compile(direlement)(scope);
        scope.$digest();
    }));

    it('should show the pagination elements', function(){
        expect(element.html()).toContain('Prev');
        expect(element.html()).toContain('Next');
    });

    it('should paginate elements', function(){
        expect(scope.datalist.paged).toEqual(scope.datalist.slice(scope.pagingOptions.curPage,scope.pagingOptions.pageSize));
    });

    it('should change page', function(){
        var isolateScope = element.isolateScope();
        isolateScope.changePage(1);
        var start = scope.pagingOptions.curPage * scope.pagingOptions.pageSize;
        expect(scope.datalist.paged).toEqual(scope.datalist.slice(start,start+scope.pagingOptions.pageSize));
    });
});