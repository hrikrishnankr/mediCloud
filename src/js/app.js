'use strict';

angular.module('mediCloud', [
        'ui.bootstrap',
        'ui.router',
        'firebase',

        'mediCloud.list'
    ])
    .controller('AppCtrl', AppCtrl)
    .run(AppRun);

function AppCtrl($rootScope) {
    console.log("main module");
}

function AppRun() {
    // Serive Worker registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./serviceWorker.js')
            .then(function() { console.log('Service Worker Registered'); });
    }
    
    // Firebase coiguration
    var config = {
        apiKey: "AIzaSyA6F_rdwz_e1ASr7lxyjG1VjT4cx7N2jSI",
        authDomain: "medicloud-c1e30.firebaseapp.com",
        databaseURL: "https://medicloud-c1e30.firebaseio.com",
        storageBucket: "medicloud-c1e30.appspot.com"
    };
    firebase.initializeApp(config);
}
