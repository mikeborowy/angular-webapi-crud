(function () {
    'use strict';

    angular
        .module("App.Price")
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
              name: "shell_st.priceAnalytics_st",
              config: {
                  url: "/priceAnalytics",
                  templateUrl: "app/price/analytics/priceAnalyticsView.html",
                  controller: "PriceAnalyticsCtrl",
                  resolve: {
                      dataContext: ['ProductResource', function (dataService) {
                          return dataService.getList()
                      }]
                  }
              }
          }
        ]
    }
})();