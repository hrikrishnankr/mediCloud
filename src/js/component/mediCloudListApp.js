(function() {
    'use strict';

    angular.module('mediCloud.list', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('storage', {
                abstract: true,
                url: '/storage',
                template: '<div ui-view></div>',
                redirectTo: 'storage.list'
            })
            .state('storage.list', {
                url: '/list',
                templateUrl: './src/js/component/medi-cloud-list.html',
                controller: 'medicloudListCtrl',
                controllerAs: 'storage'
            });

        $urlRouterProvider.otherwise('/storage/list');
    }

})();
