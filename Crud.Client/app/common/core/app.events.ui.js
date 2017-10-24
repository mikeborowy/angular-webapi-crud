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

        $rootScope.$on('$stateChangeStart', function (event, current, previous) {

            logger.info('----changing states has started');
            $rootScope.isLoading = true;

            $rootScope.$broadcast('dataPreloader', { isLoading: true })

        });

        $rootScope.$on('$stateChangeSuccess', function (event, current, previous) {

            logger.info('----successfully changed states');
            $rootScope.isLoading = false;

        });

        $rootScope.$on('$stateChangeError', function (event, current, previous, rejection) {

            logger.error('----error changing states');

            logger.log(event);
            logger.log(current);
            logger.log(previous);
            logger.log(rejection);

        });
    };
})()