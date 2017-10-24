(function () {
    'use strict';

    var serviceId = "ProductService";

    angular
        .module("App.Common.Services")
        .factory(serviceId, ProductServiceFn)

    ProductServiceFn.$inject = [
        "$appConfig",
        "CommonServices"
    ];

    function ProductServiceFn($appConfig, commonServices) {

        console.log("works");

        var $q = commonServices.$q;
        var $http = commonServices.$http;

        var service = {
            getData: GetData,
            saveData: SaveData,
            updateData: UpdateData
        }

        return serivce;

        function GetData() {

            conosle.log($appConfig.serverAPIPath + "/api/Products")

            // $q <=> promise library helps in handling assynchronous communication
            var deffered = $q.defer();
            //ajax call GET
            $http
                .get($appConfig.serverAPIPath + "/api/Products")
                .success(deffered.resolve)
                .error(deffered.reject)

            return deffered.promise;

        };
        function SaveData() { };
        function UpdateData() { };

    }

})();


//registrationModule.factory('instructorsRepository', function ($http, $q) {

//    return {
//        get: function () {
//            // $q <=> promise library helps in handling assynchronous communication
//            var deffered = $q.defer();
//            //ajax call GET
//            $http
//                .get('/Instructors')
//                .success(deffered.resolve)
//                .error(deffered.reject)

//            return deffered.promise;
//        }

//    }
//});