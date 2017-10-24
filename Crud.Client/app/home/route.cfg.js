(function () {
    'use strict';

    angular
        .module("App.Home")
        .config(ConfigRouteFn);

    //must be called $stateProvider => "ui.router"
    function ConfigRouteFn($stateProvider) {

        $stateProvider
             /*Home*/
             .state("home_st", {
                 url: "/",
                 templateUrl: "app/home/welcome/homeView.html"
             })
    
    }
})();