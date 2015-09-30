(function(module) {
try {
  module = angular.module('protrack');
} catch (e) {
  module = angular.module('protrack', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/main.html',
    '<div class="container"><div class="row" ng-controller="MainCtrl as mainCtrl"><div class="col-sm-6 col-md-4" ng-repeat="work in mainCtrl.works | orderBy:\'rank\'"><div>{{work.date}}</div><div>{{work.tag}}</div><div>{{work.desc}}</div><div>{{work.time}}</div></div></div></div><hr><div class="footer"><p>protrack prototype with firebase</p></div>');
}]);
})();
