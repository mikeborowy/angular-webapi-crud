(function () {
    'use strict';

    /*
     *   Create Run Method
     * RunModuleFn.$inject = ["$rootScope"];
     * function RunModuleFn($rootScope) { }
     */

    angular
        .module("App.Core")
        .run(AppRunFn)

    AppRunFn.$inject = [
        "$rootScope",
        "Logger"
    ]

    function AppRunFn($rootScope, logger) {

        $rootScope.isLoading = false;

        $rootScope.$on('$routeChangeStart', function (event, current, previous) {

            logger.info('----changing routes has started');
            $rootScope.isLoading = true;

        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            logger.info('----successfully changed routes');
            $rootScope.isLoading = false;

        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

            logger.error('----error changing routes');

            logger.error(event);
            logger.error(current);
            logger.error(previous);
            logger.error(rejection);

        });
    };
})()