(function() {
    "use strict";

    angular.module('mediCloud.list')
        .controller('addStorageCtrl', addStorageCtrl);

    function addStorageCtrl($uibModal, $scope) {

        /* private declarations */
        var vm = this;

        /* initialzations */

        /* view-model methods (references) */
        vm.addStorage = addStorage;

        /* private methods*/
        function addStorage() {
            
        }

    }

})();
