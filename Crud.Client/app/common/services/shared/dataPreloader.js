(function () {
    'use strict';

    var serviceId = "DataPreloader";

    angular
		.module("App.Common.Services")
        .factory(serviceId, ServiceFn);

    ServiceFn.$inject = [
        "$rootScope"
    ]

    function ServiceFn($rootScope) {

        $rootScope.dataIsLoading = false;

        return {
            show: function (show) { $rootScope.dataIsLoading = show },
            getLoadingStatus: function () { return $rootScope.dataIsLoading; }
        }
    }

})()