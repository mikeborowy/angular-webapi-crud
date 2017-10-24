(function () {
    'use strict';

    var controllerId = "ProductListCtrl";

    angular
        .module("App.Products")
        .controller(controllerId, ProductListCtrlFn);

    ProductListCtrlFn.$inject = [
        "DataPreloader",
        "CommonServices",
        "ProductsService",
        "$state",
        "UserAccount"
    ]

    function ProductListCtrlFn(preloader, commonServices, productsService, $state, userAccount) {

        var vm = this;
        var logger = commonServices.logger;
        var $q = commonServices.$q;
        var $rootScope = commonServices.$rootScope;

        vm.products = [];
        vm.showImage = false;
        vm.ShowImageBtnTxt = "Show Image";
      
        logger.init(controllerId);
        preloader.show(true);

        var ProductsPromise1 = productsService.getList();
        var promisesArray = [ProductsPromise1];

        $q.all(promisesArray)
            .then(OnSuccess)
            .catch(OnError);

        /***********************
         * PROMISE HANDLERS
         **********************/

        function OnSuccess(response) {
            //throw "error in success handler";

            response.forEach(function (dataSet, index, array) {

                logger.info(controllerId + " promise no: " + index + " derefered.")

                if (index == promisesArray.length - 1) {

                    preloader.show(false);
                    logger.info(controllerId + " proccesing promisses completed.")
                }
            })

            var productList = response[0].concat(response[1])
            vm.products = response[0];

            vm.OnImageBtnClick = OnImageToggle;
            vm.OnDeleteClick = OnDelete;
        }

        /*********************
         *  Click Handlers 
         **********************/
        function OnImageToggle() {
            if (vm.showImage) {
                vm.ShowImageBtnTxt = "Show Image";
                vm.showImage = false;

            }
            else {
                vm.ShowImageBtnTxt = "Hide Image";
                vm.showImage = true;
            }
        }

        /*********************
         *  Http Click Handlers 
         **********************/
        function OnDelete(productId) {

            productsService
                .remove(productId)
                .then(function (response) {

                    logger.info(response);
                    $state.reload();
                })
                .catch(OnError)
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
    }

})();