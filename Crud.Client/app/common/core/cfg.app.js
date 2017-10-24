var APP_START_CFG = (function (cfg) {

    var cfg = {}

    var angularServices = [
         // Angular modules 
        "ngRoute",          // angular routing based on url
        "ngResource",       // angular $resource service
        "ngAnimate",        // animations
        "ngSanitize",       // sanitizes html bindings (ex: sidebar.js)

        // 3rd party libraries
        "ui.router",  		//ui angular routing based on states
        "ui.mask",			//masks input fields
        "ui.bootstrap",		//bootstrap
        "chart.js"			//charts
    ];

    var customEvents = {
        loadingStarted: 'loadingStarted',
        EndedStarted: 'loadingEnded'
    };

    var server = {
        host: "http://localhost",
        port: "55675"
    }

    var authorizationOn = false;
    var serverMockEnabled = false;

    var GetDependenciesFn = function () {
        if (serverMockEnabled)
            angularServices.push("ProductResourceMock");
        return angularServices;
    }

    var debug = true;
    var debugObjects = true;

    var cConfig = {};
    cConfig.APP_TITLE = "CRUD App";
    cConfig.APP_DESC = "Creat, Read, Update, Delete App";
    cConfig.APP_VER = "1.0";
    cConfig.APP_DEBUG = debug;
    cConfig.DEBUG_OBJECTS = debugObjects;
    cConfig.SERVER_API_URL = server.host + ":" + server.port;
    cConfig.IS_LOGGED_IN = serverMockEnabled ? true : false;
    cConfig.USE_DATA_RESOURCE = true;
    cConfig.INTERCEPTORS_ON = false;
    cConfig.AUTHORIZATION_ON = authorizationOn;

    cfg.C_CONFIG = cConfig;
    cfg.SERVER_MOCK_ENABLED = serverMockEnabled;
    cfg.DEPENDENCIES = GetDependenciesFn();

    return cfg;

}(APP_START_CFG));


