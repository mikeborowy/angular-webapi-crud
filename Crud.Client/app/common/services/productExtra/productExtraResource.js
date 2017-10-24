(function () {
    'use strict';

    var resourceId = "ProductExtraResource";

    angular
        .module("App.Common.Services")
        .factory(resourceId, ProductResourceFn);

    ProductResourceFn.$inject = [
        "$appConfig",
        "ProductModel",
        "CommonServices",
        "UserAccount",
        "CurrentUser"
    ];

    function ProductResourceFn($appConfig, ProductModel, commonService, userAccount, currentUser) {

        //var currentUser = userAccount.currentUserData;

        var $resource = commonService.$resource;
        var $timeout = commonService.$timeout;
        var $rootScope = commonService.$rootScope;

        var services = {
            getData: GetDataFn
        }

        return services;

        function GetDataFn(id) {

            var resource;

            if (!$appConfig.serverMockEnabled) {
                //for WebAPI from different host
                resource = $resource($appConfig.serverAPIPath + "/api/Products/:productId", null, {
                    //default action added here due to headers prop
                    'get': {
                        headers: { 'Authorization': 'Bearer ' + currentUser.token }
                        //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                    },
                    //default action added here due to headers prop
                    'save': {
                        method: 'POST',
                        headers: { 'Authorization': 'Bearer ' + currentUser.token }
                        //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                    },
                    //custom action
                    'update': {
                        method: 'PUT',
                        headers: { 'Authorization': 'Bearer ' + currentUser.token }
                        //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                    }
                });
            }
            else {
                //for mockup data
                resource = $resource("/api/products/:productId");
            }

            var resourceData;

            if (id != null) {
                resourceData = resource.get({ productId: id });
            }
            else {
                resourceData = resource.query();
            }

            return $timeout(function () {
                return commonService.transformToModel(resourceData, ProductModel);
            }, 1000);
        }

        //function OnHttpSuccessHandler(response) {
        //    var dataAsModel;
        //    if (response.length === 0)
        //        dataAsModel = []
        //    else
        //        dataAsModel = commonService.transformToModel(response, ProductModel);
        //    return dataAsModel;
        //}

        //function OnHttpErrorHandler(error) {
        //    var msg = "";
        //    if (error.status == 404) {
        //        msg = "Error acessing resource " + reerrorsponse.config.method + " " + error.config.url;
        //    }
        //    else {
        //        msg = error.statusText;
        //    }
        //    if (toastr)
        //        toastr.error(msg);
        //    else
        //        alert(msg);
        //}
    }

})();