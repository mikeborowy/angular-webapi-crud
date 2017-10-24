(function () {
    'use strict';

    var controllerId = "ProductDetailCtrl";

    angular
        .module("App.Products")
        .controller(controllerId, ProductDetailCtrlFn);

    //productObj comes from resolve service in state "productDetail" => app.js
    //it is simply product object returned from "ProductResource/dataContext" service get() query
    ProductDetailCtrlFn.$inject = [
        "DataPreloader",
        "CommonServices",
        "ProductsService",
        "$stateParams",
        "ProductCalculationsSrvc"
    ];

    //function ProductDetailCtrlFn(dataContext, productId, productCalculations) 
    function ProductDetailCtrlFn(preloader, commonServices, productsService, $stateParams, productCalculations) {

        var vm = this;
        var logger = commonServices.logger

        logger.init(controllerId);
        preloader.show(true);

        var ProductsPromise = productsService
               .getById($stateParams.productId)
               .then(OnSuccess)
               .catch(OnError)

        function OnSuccess(response) {

            preloader.show(false);

            vm.product = response;
            vm.title = "Product Detail: " + vm.product.productName;
            vm.marginPercent = productCalculations.calculateMarginPercent(vm.product.price, vm.product.cost);

            if (vm.product.tags)
                vm.product.tagList = vm.product.tags.toString();
        }

        /*
         * Error Handler 
         */
        function OnError(response) {
            vm.message = response.statusText + "\r\n";
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }
            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;

            toastr.error(vm.message);
        }
    }
})();