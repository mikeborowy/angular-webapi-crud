(function () {
    'use strict';

    angular
        .module("App.Products")
        .config(ConfigRouteFn);

    ConfigRouteFn.$inject = ["$appStatesProvider"]

    //must be called custom providers $appStateProvider => "app.core.js"
    function ConfigRouteFn($appStatesProvider) {

        $appStatesProvider.SetStates(GetModuleStates());
    }

    function GetModuleStates() {

        return [
          /*Product List*/
          {
              name: "shell_st.productList_st",
              config: {
                  url: "/products",
                  templateUrl: "app/products/productList/productListView.html",
                  controller: "ProductListCtrl as vm"
              }
          },
          /*Product Detail*/
          {
              name: "shell_st.productDetail_st",
              config: {
                  url: "/products/:productId",
                  templateUrl: "app/products/productDetail/productDetailView.html",
                  controller: "ProductDetailCtrl as vm"
              },
          },
         /*Product Edit*/
         {
             name: "shell_st.productEdit_st",
             config: {
                 abstract: true,
                 url: "/products/edit/:productId",
                 templateUrl: "app/products/productEdit/productEditView.html",
                 controller: "ProductEditCtrl as vm"
             }
         },
        /*Product Edit: Info*/
        {
            name: "shell_st.productEdit_st.info_st",
            config: {
                url: "/info",
                templateUrl: "app/products/productEdit/Info/productEditInfoView.html",
                controller: "ProductEditInfoCtrl as vm"
            }
        },
        /*Product Edit: Price*/
          {
              name: "shell_st.productEdit_st.price_st",
              config: {
                  url: "/price",
                  templateUrl: "app/products/productEdit/Price/productEditPriceView.html",
                  controller: "ProductEditPriceCtrl as vm"
              }
          },
          /*Product Edit: Tags*/
          {
              name: "shell_st.productEdit_st.tags_st",
              config: {
                  url: "/tags",
                  templateUrl: "app/products/productEdit/Tags/productEditTagsView.html",
                  controller: "ProductEditTagsCtrl as vm"
              }
          }
        ];
    }
})();