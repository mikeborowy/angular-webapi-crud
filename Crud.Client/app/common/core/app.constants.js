(function () {
    'use strict';

    angular
        .module("App.Constants", [])
        .constant("cCustomEvents", {
            //PRELOADING EVENTS
            LOADING_STARTED: 'loadingStarted',
            LOADING_ENDED: 'loadingEnded'
           })
        .constant("cUserActionTypes", {
            //USER ACTIONS
            REGISTER: "register",
            LOGIN: "login",
            LOGOUT: "logout"
        }).
        constant("dataAction", {
            //DATA CONTEXT ACTIONS
            QUERY: "query",
            GET: "get",
            SAVE: "save",
            UPDATE: "update",
            DELETE: "delete",
            GET_ALL: "all"
        })


})()