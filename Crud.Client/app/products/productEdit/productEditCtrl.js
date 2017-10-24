(function () {
    'use strict';

    var controllerId = "ProductEditCtrl"

    angular
        .module("App.Products")
        .controller(controllerId, ProductEditCtrlFn);

    //.controller("ProductEditCtrl", ["dataContext", ProductEditCtrlFn]);
    //.controller('DatepickerDemoCtrl', ['$scope', '$productObj', '$timeout', function ($scope, $productObj) { 
    //    var vm = $scope;
    //}])

    ProductEditCtrlFn.$inject = [
        "DataPreloader",
        "CommonServices",
        "ProductsService",
        "$stateParams"
    ];

    function ProductEditCtrlFn(preloader, commonServices, productsService, $stateParams) {

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

            if (vm.product && vm.product.productId) {
                vm.title = "Edit: " + vm.product.productName;
            }
            else {
                vm.title = "New Product"
            }
        }

        /*********************
       *  Http Result Handlers 
       **********************/
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
       
    };

})();