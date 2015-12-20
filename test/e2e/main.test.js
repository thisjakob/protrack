'use strict';

describe('main tests:', function () {
    var testdata = {
        input: {
            login: {
                email: 'test@protrack.com',
                pw: 'protrack'
            },
            tag: {
                name: 'tag1',
                desc: 'description tag1'
            },
            project: {
                name: 'project1'
            },
            track: {
                desc: 'track1',
                starttime: '08:23',
                endtime: '10:47',
                duration: '02:24:00'
            }
        }
    };

    it('login', function () {
        browser.get('http://localhost:3000');
        browser.setLocation('login');
        browser.sleep(200);
        element(by.css('#email')).sendKeys(testdata.input.login.email);
        element(by.css('#password')).sendKeys(testdata.input.login.pw);
        element(by.partialButtonText('Login')).click();
        browser.sleep(2000);
    });

    it('config tag and project', function () {
        browser.setLocation('config');
        browser.sleep(2000);

        element.all(by.css('md-tab-item')).then(function (tabs) {
            // Configuration.tags
            tabs[1].click();
            browser.sleep(2000);

            // add new tag
            element(by.cssContainingText('button span', 'Add new Tag')).click();
            browser.sleep(500);
            element(by.css('#tagsName0')).sendKeys(testdata.input.tag.name);
            element(by.css('#tagDesc0')).sendKeys(testdata.input.tag.desc);
            browser.sleep(500);
            element(by.cssContainingText('button md-icon', 'done')).click();
            browser.sleep(500);

            // Configuration.projects
            tabs[0].click();
            browser.sleep(2000);
            // add new project
            element(by.cssContainingText('button span', 'Add new Project')).click();
            browser.sleep(500);
            element(by.css('#projectsName0')).sendKeys(testdata.input.project.name);
            element(by.cssContainingText('option', 'tag1: description tag1')).click();
            browser.sleep(500);
            element(by.cssContainingText('button md-icon', 'done')).click();
            browser.sleep(500);
        });
        var tag = element(by.css("span.project-tag"));
        expect(tag.getText()).toEqual(testdata.input.tag.name);
    });

    it('input track', function () {
        browser.setLocation('timer');
        browser.sleep(200);

        // create track1
        element(by.css('#currentDesc')).sendKeys(testdata.input.track.desc);
        browser.sleep(200);
        browser.executeScript("angular.element(document.getElementById('inp_starttime')).val('');");
        browser.sleep(200);
        element(by.css('#inp_starttime')).sendKeys(testdata.input.track.starttime);
        browser.sleep(200);
        browser.executeScript("angular.element(document.getElementById('inp_endtime')).val('');");
        element(by.css('#inp_endtime')).sendKeys(testdata.input.track.endtime);
        browser.sleep(200);
        var tag = element(by.css("#inp_duration"));
        tag.getAttribute('value').then(function (value) {
            expect(value).toEqual(testdata.input.track.duration);
        });
        // set project
        element.all(by.css('md-select')).each(function (eachElement, index) {
            eachElement.click();                    //select the select
            browser.driver.sleep(500);              //wait for the renderings to take effect
            element(by.css('md-option')).click();   //select the first md-option
            browser.driver.sleep(500);              //wait for the renderings to take effect
        });

        // add track
        element(by.cssContainingText('button md-icon', 'add')).click();

        // check track in list
        expect(element(by.css('md-list-item span')).getText()).toBe(testdata.input.track.desc);
        expect(element(by.css('md-chip')).getText()).toBe(testdata.input.project.name);
    });

    it('delete track', function () {
        element(by.cssContainingText('button md-icon', 'delete')).click();
        browser.sleep(1000);
    });

    it('delete tag and project', function () {
        browser.setLocation('config');
        browser.sleep(2000);
        element.all(by.css('md-tab-item')).then(function (tabs) {
            // Configuration.tags
            tabs[1].click();
            browser.sleep(5000);

            // delete tag
            element(by.cssContainingText('button md-icon', 'delete')).click();
            browser.sleep(20000);
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
