(function () {
    'use strict';

    angular
        .module("App.Shell")
        .config(ConfigRouteFn);

    function ConfigRouteFn($appStatesProvider) {

        $appStatesProvider.SetStates(GetModuleStates());
    }

    function GetModuleStates() {

        return [
          {
              name: "shell_st",
              config: {
                  //url: "/", if you want to have access just to that state
                  abstract: true,
                  templateUrl: "app/shell/shellView.html",
                  controller: "ShellCtrl as vm"
              }
          }
          //{
          //    name: "shared_st",
          //    config: {
          //        url: "/",
          //        views: {
          //            '@': { templateUrl: 'app/shared/sharedView.html' },
          //            'navbar@shared_st': { templateUrl: 'app/shared/sharedNavBar.html' }
          //        }
          //    }
          //}
        ]
    }

})();
