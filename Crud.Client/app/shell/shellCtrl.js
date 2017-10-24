(function () {
    'use strict';

    var controllerId = "ShellCtrl";

    angular
        .module("App.Shell")
        .controller(controllerId, SharedCtrlFn)

    SharedCtrlFn.$inject = [
        "$appConfig",
        "$state",
        "UserAccount",
        "CurrentUser"
    ];

    function SharedCtrlFn($appConfig, $state, userAccount, currentUser) {

        var vm = this;
        vm.UserLoggedIn = function () {

            if ($appConfig.serverMockEnabled)
                return true;
            else if(!$appConfig.loginOn)
                return true;
            else
                return currentUser.getProfile().isLoggedIn;
        };

        vm.OnUserLogOut = function () {

            //userAccount.logout.logoutUser(vm.userData, OnLogoutSuccess, OnLogoutError);

            $state.go("splash_st");

            vm.message = "";
            vm.password = "";
            vm.token = currentUser.setProfile("", "", false);
        };

        //function OnLogoutSuccess(data) {
        //    vm.message = "";
        //    vm.password = "";
        //    vm.token = currentUser.setProfile("", "", false);
        //    $state.go("splash_st");
        //}

        //function OnLogoutError(response) {
        //    vm.userData = {
        //        userName: '',
        //        email: '',
        //        password: '',
        //        confirmPassword: '',
        //        isLoggedIn: false
        //    };
        //    vm.password = "";
        //    vm.message = response.statusText + "\r\n";
        //    if (response.data.exceptionMessage)
        //        vm.message += response.data.exceptionMessage;
        //    if (response.data.modelState) {
        //        for (var key in response.data.modelState) {
        //            vm.message += response.data.modelState[key] + "\r\n";
        //        }
        //    }
        //    toastr.error(vm.message);
        //}

    }

})()