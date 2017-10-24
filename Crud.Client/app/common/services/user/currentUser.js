(function () {
    "use strict";

    angular
        .module("App.Common.Services")
        .factory("CurrentUser", CurrentUserFn);

    function CurrentUserFn() {

        var profile = {
            isLoggedIn: false,
            userName: "",
            token: ""
        };

        function setProfile(userName, token, isLoggedIn) {
            profile.isLoggedIn = isLoggedIn;
            profile.userName = userName;
            profile.token = token;
        }

        function getProfile() {
            return profile;
        }


        return {
            setProfile: setProfile,
            getProfile: getProfile
        }
    }


})();