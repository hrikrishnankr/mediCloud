(function() {
    "use strict";

    angular.module('mediCloud.list')
        .controller('addStorageCtrl', addStorageCtrl);

    function addStorageCtrl($uibModal, $scope, $uibModalInstance) {

        /* private declarations */
        var vm = this;

        /* initialzations */
        vm.storeData = {
            name: "",
            size: "",
            region:""
        };

        /* view-model methods (references) */
        vm.add = add;

        /* private methods*/
        function add() {
            console.log("add is clicked!");
            $uibModalInstance.close(vm.storeData)
        }

    }

})();
