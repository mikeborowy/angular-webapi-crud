(function () {
    'use strict';

    angular
        .module("App.Directives")
        .directive('preloaderDirective', ['$rootScope', PreloaderFn]);

    function PreloaderFn($rootScope) {

        return {
            restrict: 'E',
            templateUrl: "app/directives/preloader/preloader.html",
            link: Preloader
        };

        function Preloader($scope, elem, attrs) {

            //$scope.isLoading = false;

            ////for ui-router
            //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //    //if (toState.resolve)
            //    console.log("start loading")
            //    $scope.isLoading = true;
            //});

            //$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //    //if (toState.resolve)
            //    console.log("end loading")
            //    $scope.isLoading = false;
            //});

            //for ngRoute
            //$rootScope.$on('$routeChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //    //if (toState.resolve)
            //    console.log("start loading")
            //    $scope.isRouteLoading = true;
            //});

            //$rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //    //if (toState.resolve)
            //    console.log("end loading")
            //    $scope.isRouteLoading = false;
            //});
        }
    };
})()

