(function() {
    "use strict";

    angular.module('mediCloud.list')
        .controller('medicloudListCtrl', medicloudListCtrl);

    function medicloudListCtrl($uibModal, $rootScope) {

        /* private declarations */
        var vm = this;

        /* initialzations */
        vm.storageSpace = [];

        /* view-model methods (references) */
        vm.addStorage = addStorage;
        $rootScope.addStorage = addStorage;

        /* private methods*/
        function addStorage() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "../src/js/component/add-storage.html",
                size: "sm",
                controller: 'addStorageCtrl'
            });
        }

    }

})();
