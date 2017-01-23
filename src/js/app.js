'use strict';

angular.module('mediCloud', [
        'ui.bootstrap',
        'ui.router',

        'mediCloud.list'
    ])
    .controller('AppCtrl', AppCtrl);

function AppCtrl($rootScope) {
    console.log("main module");
}