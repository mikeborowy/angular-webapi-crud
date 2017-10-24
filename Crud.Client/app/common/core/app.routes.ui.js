(function () {
    'use strict';

    angular
        .module("App.Core")
        .provider("$appStates", AppStatesProviderFn)
        .provider("$urlParams", UrlParamsProviderFn)
    //.config(ConfigStatesFn)

    //must be called $urlRouterProvider defines default state
    //must be called $locationProvider
    //function ConfigStatesFn($urlRouterProvider) {
    //$urlRouterProvider.otherwise("/");
    //}

    //must be sent as parameter with addition "Provider" so it is 
    //named as appStates but called as "appStatesProvider"
    function AppStatesProviderFn($urlRouterProvider, $stateProvider, $appConfigProvider) {

        var _states = [];

        console.log($appConfigProvider.loginOn)

        return {

            SetStates: function (value) {

                _states = value
                _states.forEach(function (st) {
                    $stateProvider.state(st.name, st.config);
                });

                if ($appConfigProvider.loginOn)
                    $urlRouterProvider.otherwise("/splash");
                else
                    $urlRouterProvider.otherwise("/products");
            },
            $get: function () { return _states }
        };

    }

    function UrlParamsProviderFn() {

        var _params = [];

        return {

            SetParams: function (value) {

                _params = value
            },
            $get: function () { return _params }
        };

    }
})();