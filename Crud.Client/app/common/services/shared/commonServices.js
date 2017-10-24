(function () {
    'use strict';

    var serviceId = "CommonServices";

    angular
		.module("App.Common.Services")
        .factory(serviceId, ServiceFn);

    ServiceFn.$inject = [
        "$q",
        "$http",
        "$resource",
        "$rootScope",
        "$timeout",
        "Logger"
    ]

    function ServiceFn($q, $http, $resource, $rootScope, $timeout, logger) {

        var services = {
            $q: $q,
            $http: $http,
            $resource: $resource,
            $rootScope: $rootScope,
            $broadcast: BroadcasFn,
            $timeout: $timeout,
            logger: logger,
            activateServices: activateServicesFn,
            transformToModel: TransformFn,
            showPreloader: DataPreloader
        }

        return services;

        function BroadcasFn() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function activateServicesFn(promisesArray, controllerId) {

            logger.info(controllerId + " is checking promises...")

            $q.all(promisesArray).then(function (data) {

                $rootScope.$broadcast('dataPreloader:' + controllerId, { isLoading: true, controller: controllerId })

                data.forEach(function (dataSet, index, array) {

                    if (index == promisesArray.length - 1) {

                        logger.info(controllerId + " proccesing promisses completed.")
                        $rootScope.$broadcast('dataPreloader:' + controllerId, { isLoading: false, controller: controllerId })
                    }
                })

            })
        }

        function TransformFn(jsonResult, modelConstructor, user, propertyName) {

            if (angular.isArray(jsonResult)) {

                var models = [];

                angular.forEach(jsonResult, function (object) {
                    models.push(TransformObjectFn(object, modelConstructor, user, propertyName));
                });

                return models;
            }
            else {
                return TransformObjectFn(jsonResult, modelConstructor, user, propertyName);
            }
        }

        //In contrast to DataPrealodre Service
        function DataPreloader(showParam) {

            $rootScope.dataIsLoading = showParam;
        }

        /*** Private Methods ***/
        function TransformObjectFn(jsonResult, modelConstructor, user, propertyName) {

            var model = new modelConstructor();
            model.toObject(jsonResult, user, propertyName);

            return model;
        }

    }

})();