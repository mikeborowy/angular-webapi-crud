(function () {
    "use strict";

    var serviceId = "UserAccount"

    angular
        .module("App.Common.Services")
        .factory(serviceId, UserAccountFn);

    UserAccountFn.$inject = [
        "$appConfig",
        "CommonServices",
        "cUserActionTypes",
        "Logger"
    ]

    function UserAccountFn($appConfig, commonServices, cUserActionTypes, logger) {
        
        var $resource = commonServices.$resource;

        var ActionType = cUserActionTypes;
        logger.info(serviceId + " has been created");

        return {
            register: $resource($appConfig.serverAPIPath + "/api/Account/Register", null, ActionSetup(ActionType.REGISTER)),
            login: $resource($appConfig.serverAPIPath + "/Token", null, ActionSetup(ActionType.LOGIN)),
            logout: $resource($appConfig.serverAPIPath + "/api/Account/Logout", null, ActionSetup(ActionType.LOGOUT))
            //moved to currentUser service
            //,currentUserData: {
            //    userName: "",
            //    password: "",
            //    token: "",
            //    isLoggedIn: false
            //}
        }

        function ActionSetup(param) {

            var obj = {};

            switch (param) {

                case ActionType.REGISTER:

                    obj = {
                        'registerUser': { method: 'POST' }, //custom actions
                    }
                    break;

                case ActionType.LOGIN:

                    obj = {
                        'loginUser': {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: TransformRequest
                        } //custom actions
                    }
                    break;

                case ActionType.LOGOUT:

                    obj = {
                        'logoutUser': {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            transformRequest: TransformRequest
                        } //custom actions
                    }
                    break;

            }

            return obj;
        }

        function TransformRequest(data, headersGetter) {

            var str = []
            for (var dataItem in data) {
                str.push(encodeURIComponent(dataItem) + "=" + encodeURIComponent(data[dataItem]))
            }
            return str.join("&");
        }
    }

}());