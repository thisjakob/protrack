'use strict';

describe('The main view', function () {

  beforeEach(function () {
    browser.get('http://localhost:3000');
  });

  it('login protrack', function () {
    element.all(by.repeater('awesomeThing in awesomeThings')).count().then(function(count) {
      expect(count > 5).toBeTruthy();
    });
  });

});
