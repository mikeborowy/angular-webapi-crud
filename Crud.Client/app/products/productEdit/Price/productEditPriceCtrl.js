(function () {
    'use strict';

    var controllerId = "ProductEditPriceCtrl";

    angular
        .module("App.Products")
        .controller(controllerId, ProductEditPriceCtrlFn);

    ProductEditPriceCtrlFn.$inject = [
        "DataPreloader",
        "CommonServices",
        "ProductsService",
        "$stateParams",
        "$state",
        "ProductCalculationsSrvc"
    ];

    function ProductEditPriceCtrlFn(preloader, commonServices, productsService, $stateParams, $state, productCalculations) {

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
            vm.priceOption = "percent";
            vm.message = '';

            vm.OnMarginPercent = MarginPercent;
            vm.OnCalculatePrice = CalculatePrice;
            vm.OnSaveClick = SaveClick;
            vm.OnCancelClick = CancelClick;
        }

        /*********************
         *  Click Handlers 
         **********************/

        function MarginPercent() {
            return productCalculations.calculateMarginPercent(vm.product.price, vm.product.cost);
        }

        function CalculatePrice() {

            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productCalculations.calculatePriceFromMarkupAmount(vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productCalculations.calculatePriceFromMarkupPercent(vm.product.cost, vm.markupPercent);
            }

            vm.product.price = price;
        }

        /*********************
        *  Http Click Handlers 
        **********************/
        function SaveClick(productForm) {

            if (productForm.$valid) {
                //if product has id then it is update
                if (vm.product.productId) {
                    //we call custom upadte method passing id of product as parameter
                    productsService.update(vm.product.productId, vm.product)
                      .then(OnUpdateSuccess)
                      .catch(OnError)
                }
                    //else we create a new product
                else {
                    productsService.create(vm.product)
                       .then(OnCreateSuccess)
                       .catch(OnError)
                }
            }
            else {
                vm.message = 'Please correct the validation first';
                toastr.error(vm.message);
            }
        }

        function CancelClick() {
            $state.go('productList_st');

            //productForm.$setPristine();
            //vm.product = angular.copy(vm.originalProduct);
            //vm.message = "";
        }

        /*********************
        *  Http Result Handlers 
        **********************/
        function OnUpdateSuccess(response) {
            vm.message = "... Update Complete";
            toastr.success(vm.message);
        }

        function OnSaveSuccess(response) {
            //vm.originalProduct = angular.copy(response);
            vm.message = "... Save Complete";
            toastr.success(vm.message);
        }

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

})()