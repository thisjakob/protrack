/**
 * Created by this on 08.11.15.
 */
(function () {
    'use strict';

    angular.module('protrack')
        .controller('ToolbarCtrl', ['$mdSidenav', 'pageName', function ($mdSidenav, pageName) {
            var toolbarCtrl = this;
            toolbarCtrl.pageName = pageName;

            toolbarCtrl.toggleSidenav = function(){
                $mdSidenav('left').toggle();
            };
        }]);
})();