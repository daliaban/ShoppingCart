/**
 * Created by dalia on 10/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .directive('dirPaginate', function(){

        return {
            templateUrl: 'view/partials/paging.html',
            scope: {
                datalist: "=",
                pagingOptions: "="
            },
            controller: function ($scope) {
                $scope.datalist.paged = $scope.datalist.slice(0,$scope.pagingOptions.pageSize);
                $scope.pagingOptions.totalPages = Math.ceil($scope.datalist.length/$scope.pagingOptions.pageSize);

                $scope.changePage = function(thisPage){
                    $scope.datalist.paged = [];
                    $scope.pagingOptions.curPage = thisPage;
                    var startFrom = thisPage*$scope.pagingOptions.pageSize;

                    for(var i=0; i<$scope.pagingOptions.pageSize; i++){
                        $scope.datalist.paged[i] =  $scope.datalist[startFrom+i];
                    }
                }
            }
        }
});
