(function () {
    'use strict';

    angular
        .module("App.Splash")
        .config(ConfigRouteFn);

    //must be called $stateProvider => "ui.router"
    function ConfigRouteFn($stateProvider) {

        $stateProvider
             /*Home*/
             .state("splash_st", {
                 url: "/splash",
                 templateUrl: "app/splashScreen/splashView.html"
             })
    }
})();