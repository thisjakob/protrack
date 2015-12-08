'use strict';

describe('configuration tests', function () {
    //var EC = protractor.ExpectedConditions;

    beforeEach(function () {
        browser.get('http://localhost:3000');
    });

    it('create a project', function () {
        browser.setLocation('projects');
        browser.sleep(2000);
        element(by.partialButtonText('Add new Project')).click();
        element(by.css("#projectsName0")).sendKeys('first project');
        element(by.partialButtonText('done')).click();
        browser.sleep(2000);
    });

    it('delete project', function () {
        browser.setLocation('projects');
        browser.sleep(2000);
        element(by.partialButtonText('delete')).click();
        browser.sleep(2000);
        element(by.partialButtonText('delete')).click();
        browser.sleep(2000);
    });
});
