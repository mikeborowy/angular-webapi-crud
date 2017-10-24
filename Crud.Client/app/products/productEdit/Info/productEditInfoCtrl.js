(function () {
    'use strict';

    var controllerId = "ProductEditInfoCtrl";

    angular
        .module("App.Products")
        .controller(controllerId, ProductEditInfoCtrlFn);

    ProductEditInfoCtrlFn.$inject = [
        "DataPreloader",
        "CommonServices",
        "ProductsService",
        "$stateParams",
        "$state"
    ]

    function ProductEditInfoCtrlFn(preloader, commonServices, productsService, $stateParams, $state) {

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
            //vm.originalProduct = angular.copy(productObj);
            vm.product = response;
            vm.message = '';
            vm.formats = ['MMMM, dd, yyyy', 'dd-MM-yy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
            vm.productReleaseDate = new Date(vm.product.releaseDate);

            vm.OnOpenCalendar = OpenCalendar;
            vm.OnSaveClick = SaveClick;
            vm.OnCancelClick = CancelClick;
        }

        /*********************
         *  Click Handlers 
         **********************/
        function OpenCalendar($event) {

            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        }

        /*********************
        *  Http Click Handlers 
        **********************/
        function SaveClick(productForm) {

            if (productForm.$valid) {
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
            else {
                vm.message = 'Please correct the validation first';
                toastr.error(vm.message);
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

        function OnCreateSuccess(response) {

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