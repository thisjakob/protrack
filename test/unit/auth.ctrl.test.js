'use strict';

//var MockFirebase = require('mockfirebase').MockFirebase;

describe('controller settings', function () {
    var ctrl, scope;

    beforeEach(module('protrack'));
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        //Create the controller with the new scope
        ctrl = $controller('AuthCtrl', {$scope: scope});
    }));

    it('test set and read name', inject(function () {
        MockFirebase.override();
        var ref = users.ref();
        users.create({
            email: 'ben@example.com',
            password: 'examplePass'
        });
        users.flush();
        console.assert(users.getEmailUser('ben@example.com'), 'ben was created');

        ref.changeAuthState({
            uid: 'testUid',
            provider: 'custom',
            token: 'authToken',
            expires: Math.floor(new Date() / 1000) + 24 * 60 * 60,
            auth: {
                isAdmin: true
            }
        });
        ref.flush();
        console.assert(document.location.href === '#/admin', 'redirected to admin');
    }));
});
