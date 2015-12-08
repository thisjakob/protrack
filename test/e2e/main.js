'use strict';

describe('main tests', function () {

    beforeEach(function () {
        browser.get('http://localhost:3000');
    });

    it('login and write first timer', function () {
        browser.setLocation('login');
        element(by.css('#email')).sendKeys('gip@swissonline.ch');
        element(by.css('#password')).sendKeys('sw1ssonline');
        element(by.css('.btn-primary')).click();
        browser.sleep(2000);
        browser.setLocation('timer2');
        browser.sleep(3000);
        element(by.css('#currentDesc')).sendKeys('first timer');
        //element(by.css('#editForm')).submit();
        browser.sleep(5000);
    });

});
