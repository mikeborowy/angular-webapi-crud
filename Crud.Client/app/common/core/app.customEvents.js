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

        //$rootScope.isLoading = false;

        $rootScope.$on('preloader', function (event, data) {

            if (data.isLoading)
                logger.info('----laoding data has started');
            else 
                logger.info('----laoding data has completed');
            
            //$rootScope.isLoading = data.isLoading;

        });

        $rootScope.$on('preloader:Init', function (event, data) {

            logger.info('----laoding data has started');
            //$rootScope.isLoading = true;

        });

        $rootScope.$on('preloader:Complete', function (event, data) {

            logger.info('----successfully data loaded');
            //$rootScope.isLoading = false;

        });

    };
})()