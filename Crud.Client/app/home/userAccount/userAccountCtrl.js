(function () {
    "use strict";

    angular
        .module("App.Home")
        .controller("UserAccountCtrl", ["$scope", "UserAccount", "$state", UserAccountFn]);

    function UserAccountFn($scope, userAccount, $state) {

        console.log($scope.isRouteLoading);

        var vm = this;
        vm.message = '';
        vm.userData = {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            isLoggedIn: false
        };

        //vm.isLoggedIn = function () {
        //    //return currentUser.getProfile().isLoggedIn;
        //};

        vm.isLoggedIn = false;

        vm.OnLoginClick = function () {

            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            userAccount.login.loginUser(vm.userData, OnloginSuccess, OnLoginError);
        };

        vm.OnRegisterClick = function () {

            vm.userData.confirmPassword = vm.userData.password;

            userAccount.register.registerUser(vm.userData, OnRegisterSuccess, OnRegisterError);
        };

        /*LOGIN START*/
        function OnloginSuccess(data) {

            vm.message = "";
            vm.password = "";
            vm.isLoggedIn = true;

            userAccount.currentUserData.userName = data.userName;
            userAccount.currentUserData.password = data.password,
            userAccount.currentUserData.token = data.access_token,
            userAccount.currentUserData.isLoggedIn = vm.isLoggedIn;

            $state.go('productList_st');
            //vm.token = currentUser.setProfile(data.userName, data.access_token);
        }

        function OnLoginError(response) {
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

        function OnRegisterSuccess(data) {

            vm.confirmPassword = "";
            vm.message = "...Registration Successful";
            vm.OnLoginClick();
        }

        function OnRegisterError(response) {

            vm.isLoggedIn = false;
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
