(function () {
    'use strict';

    var serviceId = "ProductsService";

    angular
        .module("App.Common.Services")
        .factory(serviceId, FactoryFn);

    FactoryFn.$inject = [
        "$appConfig",
        "CommonServices"
    ]

    function FactoryFn($appConfig, commonServices) {

        var $q = commonServices.$q;
        var $http = commonServices.$http;
        var $rootScope = commonServices.$rootScope;
        var $timeout = commonServices.$timeout;
        var logger = commonServices.logger;
        var _apiUrl = $appConfig.serverAPIPath + "/api/Products";

        logger.info(serviceId + ' has been created');

        return {
            getAPIUrl: _apiUrl,
            setAPIUrl: setServiceUrlFn,
            getList: GetAllItemsFn,
            getById: GetItemByIdFn,
            create: CreateItemFn,
            update: UpdateItemFn,
            remove: DeleteItemFn
        }

        function setServiceUrlFn(value) {
            _apiUrl = value;
        }

        /*
         * GET ALL         
         */
        function GetAllItemsFn(configObj, time) {

            var _time = time ? time : 0;

            var request = $http.get(_apiUrl, configObj)
               .then(function (response) { return OnSuccess(response, "GetAllItemsFn") })
               .catch(function (response) { return OnError(response, "GetAllItemsFn") });

            return $timeout(function () {
                return request;
            }, _time)
        }

        /*
         * GET by ID
         */
        function GetItemByIdFn(id, configObj) {

            var request = $http.get(_apiUrl + "/" + id, configObj)
               .then(function (success) { return OnSuccess(success, "GetItemByIdFn") })
               .catch(function (response) { return OnError(response, "GetItemByIdFn") });

            return request;

        }

        /*
         * CREATE by ID
         */
        function CreateItemFn(modelObject, configObj) {

            var request = $http.post(_apiUrl, modelObject, configObj)
            .then(function (success) { return OnSuccess(success, "AddItemFn") })
            .catch(function (response) { return OnError(response, "AddItemFn") });

            return request;
        }

        /*
         * UPDATE
         */
        function UpdateItemFn(id, modelObject, configObj) {

            var request = $http.put(_apiUrl + '/' + id, modelObject, configObj)
               .then(function (success) { return OnSuccess(success, "UpdateItemFn") })
               .catch(function (response) { return OnError(response, "UpdateItemFn") });

            return request;
        }

        /*
        * DELETE 
        */
        function DeleteItemFn(id, configObj) {

            var request = $http.delete(_apiUrl + '/' + id, configObj)
               .then(function (success) { return OnSuccess(success, "DeleteItemFn") })
               .catch(function (response) { return OnError(response, "DeleteItemFn") });

            return request;
        }

        /***********************
         * HTTP CALLS HANDLERS *
         **********************/

        /*
         * Success Handler
         */
        function OnSuccess(response, httpCall) {
            logger.info(serviceId + " returned data")
            return response.data;
        }

        /*
         * Error Handler 
         */
        function OnError(response, fnName) {
            return $q.reject(serviceId + ' error retrieving in ' + fnName + '. (HTTP status: ' + response + ')')
        }
    }

})()