(function () {
    "use strict";

    var controllerId = "UserAccountCtrl";

    angular
        .module("App.Splash")
        .controller(controllerId, UserAccountFn);

    UserAccountFn.$inject = [
        "$scope",
        "$state",
        "UserAccount",
        "CurrentUser"
    ];

    function UserAccountFn($scope, $state, userAccount, currentUser) {

        var vm = this;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isLoggedIn: false
        };

        /*LOGIN START*/
        vm.OnLoginClick = function () {

            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData, OnloginSuccess, OnLoginError);
        };

        function OnloginSuccess(data) {

            vm.message = "";
            vm.password = "";
            vm.token = currentUser.setProfile(data.userName, data.access_token, true);

            $state.go('shell_st.productList_st');
        }

        function OnLoginError(response) {

            vm.userData = {
                userName: '',
                email: '',
                password: '',
                confirmPassword: '',
                isLoggedIn: false
            };

            vm.password = "";
            vm.message = response.statusText + "\r\n";

            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;

            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }

            toastr.error(vm.message);
        }
        /*LOGIN END*/

        /* REGISTRATION START*/
        vm.OnRegisterClick = function () {

            vm.userData.confirmPassword = vm.userData.password;

            userAccount.register.registerUser(vm.userData, OnRegisterSuccess, OnRegisterError);
        };

        function OnRegisterSuccess(data) {

            vm.confirmPassword = "";
            vm.message = "...Registration Successful";
            vm.OnLoginClick();
        }

        function OnRegisterError(response) {

            //vm.isLoggedIn = false;
            vm.message = response.statusText + "\r\n";

            if (response.data.exceptionMessage)
                vm.message += response.data.exceptionMessage;

            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    vm.message += response.data.modelState[key] + "\r\n";
                }
            }

            toastr.error(vm.message);
        }
        /* REGISTRATION END*/
    }
}());
