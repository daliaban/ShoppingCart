/**
 * Created by dalia on 10/05/16.
 */
'use strict';

angular.module('shoppingCart')
    .directive('dirPaginate', function(){

        return {
            templateUrl: 'view/partials/paging.html',
            controller: function ($scope) {
                $scope.curPage = 0;
                $scope.pageSize = 5;
                $scope.totalPages = Math.ceil($scope.datalist.length/$scope.pageSize);
                $scope.datalist.paged = $scope.datalist.slice(0,$scope.pageSize);

                $scope.changePage = function(thisPage){
                    $scope.datalist.paged = [];
                    $scope.curPage = thisPage;
                    var startFrom = thisPage*$scope.pageSize;

                    for(var i=0; i<$scope.pageSize; i++){
                        $scope.datalist.paged[i] =  $scope.datalist[startFrom+i];
                    }
                }
            }
        }
});
