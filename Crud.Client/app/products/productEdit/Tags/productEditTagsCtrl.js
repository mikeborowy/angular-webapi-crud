(function () {
    'use strict';

    var controllerId = "ProductEditTagsCtrl";

    angular
        .module("App.Products")
        .controller(controllerId, ProductEditTagsCtrlFn);

    ProductEditTagsCtrlFn.$inject = [
        "DataPreloader",
        "CommonServices",
        "ProductsService",
        "$stateParams",
        "$state"
    ];

    function ProductEditTagsCtrlFn(preloader, commonServices, productsService, $stateParams, $state) {

        var vm = this;
        var logger = commonServices.logger;
        logger.init(controllerId);
        preloader.show(true);

        var ProductsPromise = productsService
              .getById($stateParams.productId)
              .then(OnSuccess)
              .catch(OnError)

        function OnSuccess(response) {

            preloader.show(false);
            vm.product = response;
            //vm.originalProduct = angular.copy(productObj);
            vm.message = '';

            vm.OnAddTagsClick = AddTagsClick;
            vm.OnRemoveTagClick = RemoveTagClick;
            vm.OnSaveClick = SaveClick;
            vm.OnCancelClick = CancelClick;
        }

        /*********************
         *  Click Handlers 
         **********************/
        function AddTagsClick(tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                var newTags = '';
            }
            else {
                alert("Please enter one ore more tags separated by commas");
            }
        }

        function RemoveTagClick(idx) {
            vm.product.tags.splice(idx, 1);
        }

        /*********************
         *  HTTP Click Handlers 
         **********************/
        function SaveClick(productForm) {
            //if product has id then it is update
            if (vm.product.productId) {

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

        function CancelClick(productForm) {
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

            //vm.originalProduct = angular.copy(data);
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

})();