(function() {
    "use strict";

    angular.module('mediCloud.list')
        .controller('medicloudListCtrl', medicloudListCtrl);

    function medicloudListCtrl($uibModal, $rootScope, $firebaseArray) {

        /* private declarations */
        var vm = this;
        var ref = firebase.database().ref().child("Storage");
        var storageDB = $firebaseArray(ref);

        /* initialzations */
        vm.storageSpace = [];
        $rootScope.showLoader = false;

        /* view-model methods (references) */
        vm.addStorage = addStorage;
        $rootScope.addStorage = addStorage;
        $rootScope.refreshStorage = getStorage;

        getStorage();
        /* private methods*/
        function getStorage() {
            $rootScope.showLoader = true;
            storageDB.$loaded().then(function() {
                $rootScope.showLoader = false;
                console.log(storageDB)
                vm.storageSpace = storageDB;
            });
        }

        function addStorage() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "../src/js/component/add-storage.html",
                size: "sm",
                controller: 'addStorageCtrl',
                controllerAs: 'store'
            });

            modalInstance.result.then(function(res) {
                storageDB.$add({
                    name:res.name,
                    region: res.region,
                    size:res.size+"GB"
                });
                getStorage();
            }, function(err) {})
        }
    }

})();
