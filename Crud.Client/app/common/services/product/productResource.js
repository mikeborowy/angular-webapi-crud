(function () {
    'use strict';

    var resourceId = "ProductResource";

    angular
        .module("App.Common.Services")
        .factory(resourceId, ProductResourceFn);

    ProductResourceFn.$inject = [
        "$appConfig",
        "$resource",
        "$timeout",
        "UserAccount",
        "CurrentUser"
    ];

    function ProductResourceFn($appConfig, $resource, $timeout, userAccount, currentUser) {

        //var currentUser = userAccount.currentUserData;

        var resource;
        if (!$appConfig.serverMockEnabled) {
            //for WebAPI from different host
            resource = $resource($appConfig.serverAPIPath + "/api/Products/:productId", { productId: "@productId" }, HTTPRequestSetup());
        }
        else {
            //for mockup data
            resource = $resource("/api/products/:productId");
        }

        var services = {
            get: GetFn,
            del: DelFn,
            getList: GetListFn,
        }

        return services;

        function DelFn(id) {

            return resource
                .delete({ productId: id }, HttpSuccessHandler, HttpErrorHandler)
                .$promise;
        }

        function GetFn(id) {

            return resource
                .get({ productId: id }, HttpSuccessHandler, HttpErrorHandler)
                .$promise;
        }

        function GetListFn() {

                return resource
                    .query(HttpSuccessHandler, HttpErrorHandler)
                    .$promise;
        }

        function HTTPRequestSetup() {

            return {
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
                },
                //custom action
                'delete': {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + currentUser.token }
                    //headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
                }
            }
        }

        function HttpSuccessHandler(data) {
            return data;
        }

        function HttpErrorHandler(response) {

            var msg = "";

            if (response.status == 404) {
                msg = "Error acessing resource " + response.config.method + " " + response.config.url;
            }
            else {
                msg = response.statusText;
            }

            if (toastr)
                toastr.error(msg);
            else
                alert(msg);
        }
    }

})();