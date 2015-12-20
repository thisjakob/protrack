'use strict';
describe('controller config', function() {
    var ctrl, scope;

    beforeEach(module('protrack', firebase));
    beforeEach(inject(function($controller, $rootScope, $firebase) {
        scope = $rootScope.$new();
        //Create the controller with the new scope
        ctrl = $controller('ConfigCtrl', {$scope: scope});
    }));

    it('test create tag', inject(function ($firebase) {
        //fireSync = $firebase(new Firebase('https://protrack.firebaseio.com'));

        var name = 'tag1';
        ctrl.createTag();
        expect(ctrl.createTag()).toBe(name);
    }));
});
