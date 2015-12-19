'use strict';

describe('configuration tests', function () {
    //var EC = protractor.ExpectedConditions;

    beforeEach(function () {
        browser.get('http://localhost:3000');
    });

    afterEach(function() {
        /*element(by.id("logout")).click();
        browser.sleep(100);*/
    });

    it('create a project', function () {
        browser.setLocation('login');
        browser.sleep(200);
        element(by.css('#email')).sendKeys('test@protrack.com');
        element(by.css('#password')).sendKeys('protrack');
        element(by.partialButtonText('Login')).click();
        browser.sleep(2000);
        browser.setLocation('config');
        browser.sleep(2000);

        element.all(by.css('md-tab-item')).then(function(tabs) {
            // Configuration.tags
            tabs[1].click();
            browser.sleep(2000);

            // add new tag
            element(by.cssContainingText('button span', 'Add new Tag')).click();
            browser.sleep(500);
            element(by.css('#tagsName0')).sendKeys('tag1');
            element(by.css('#tagDesc0')).sendKeys('description tag1');
            browser.sleep(500);
            element(by.cssContainingText('button md-icon', 'done')).click();
            browser.sleep(500);

            // Configuration.projects
            tabs[0].click();
            browser.sleep(2000);
            // add new project
            element(by.cssContainingText('button span', 'Add new Project')).click();
            browser.sleep(500);
            element(by.css('#projectsName0')).sendKeys('project1');
            element(by.cssContainingText('option', 'tag1: description tag1')).click();
            browser.sleep(500);
            element(by.cssContainingText('button md-icon', 'done')).click();
            browser.sleep(500);
        });
        var tag = element(by.css("span.project-tag"));
        expect(tag.getText()).toEqual('tag1');
    });

    it ('create track', function() {
        browser.setLocation('timer');
        browser.sleep(2000);

        // create track1
        element(by.css('#currentDesc')).sendKeys('track1');
        element(by.css('#input_13')).sendKeys('08:23');
        element(by.css('#input_14')).sendKeys('10:47');
        var tag = element(by.css("#input_15"));
        expect(tag.getText()).toEqual('02:24:00');
        /// TODO set project and tag
        element(by.cssContainingText('button md-icon', 'add')).click();

        // TODO check track in list
    });

    it ('delete track', function() {
        element(by.cssContainingText('button md-icon', 'delete')).click();
        browser.sleep(1000);
    });

    it('delete a project', function () {
        browser.setLocation('config');
        browser.sleep(2000);
        element.all(by.css('md-tab-item')).then(function(tabs) {
            // Configuration.tags
            tabs[1].click();
            browser.sleep(2000);

            // delete tag
            element(by.cssContainingText('button md-icon', 'delete')).click();
            browser.sleep(200);
            element(by.cssContainingText('button md-icon', 'delete')).click();
            browser.sleep(2000);

            // Configuration.projects
            tabs[0].click();
            browser.sleep(2000);
        });
        var tag = element(by.css("span.project-tag"));
        expect(tag.getText()).toEqual('No tag');

        // delete project
        element(by.cssContainingText('button md-icon', 'delete')).click();
        browser.sleep(200);
        element(by.cssContainingText('button md-icon', 'delete')).click();
        browser.sleep(2000);
    });
});
