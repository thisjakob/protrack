'use strict';

describe('configuration tests', function () {
    //var EC = protractor.ExpectedConditions;

    beforeEach(function () {
        browser.get('http://localhost:3000');
        browser.setLocation('login');
        element(by.css('#email')).sendKeys('gip@swissonline.ch');
        element(by.css('#password')).sendKeys('sw1ssonline');
        element(by.css('.btn-primary')).click();
        browser.sleep(2000);
    });

    afterEach(function() {
        element(by.id("logout")).click();
        browser.sleep(2000);
    });

    it('create a project', function () {
        browser.setLocation('config');
        browser.sleep(2000);
        element(by.partialButtonText('Add new Project')).click();
        element(by.css("#projectsName0")).sendKeys('first project');
        element(by.partialButtonText('done')).click();
        browser.sleep(2000);
    });

    it('delete project', function () {
        browser.setLocation('config');
        browser.sleep(2000);
        element(by.partialButtonText('delete')).click();
        browser.sleep(2000);
        element(by.cssContainingText('.md-primary', 'delete')).click();
        //element(by.partialButtonText('delete')).click();
        browser.sleep(2000);
    });
});
