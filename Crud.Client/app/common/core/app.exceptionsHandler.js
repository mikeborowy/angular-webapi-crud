(function () {
    'use strict';

    angular
        .module("App.Core")
        .config(ConfigRoutesFn);

    function ConfigRoutesFn( $provide ) {

        //exceptions
        $provide.decorator("$exceptionHandler", ["$delegate", ExceptionHandler]);

        function ExceptionHandler($delegate) {

            return function (exception, cause) {

                exception.message = "Please contact the Help Desk! \n Message: " + exception.message;
                $delegate(exception, cause);

                toastr.error(exception.message);
            }
        }
        
    }
})();