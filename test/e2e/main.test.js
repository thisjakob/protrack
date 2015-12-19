'use strict';

describe('main tests', function () {
    //var EC = protractor.ExpectedConditions;

    beforeEach(function () {
        browser.get('http://localhost:3000');
    });

    afterEach(function() {
        element(by.id("logout")).click();
    });

    it('login and write first timer', function () {
        browser.setLocation('login');
        element(by.css('#email')).sendKeys('test@protrack.com');
        element(by.css('#password')).sendKeys('protrack');
        element(by.partialButtonText('Login')).click();
        browser.sleep(200);
        browser.setLocation('timer');
        browser.sleep(300);
        element(by.css('#currentDesc')).sendKeys('first timer');
    });

});
