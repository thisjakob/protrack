'use strict';
describe('controller settings', function() {
    var ctrl, scope;

    beforeEach(module('protrack'));
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        //Create the controller with the new scope
        ctrl = $controller('SettingsCtrl', {$scope: scope});
    }));

    it('test set and read name', inject(function () {
        var name = 'James';
        ctrl.setLoginName(name);
        expect(ctrl.getLoginName()).toBe(name);
    }));
});
