(function(module) {
try {
  module = angular.module('protrack');
} catch (e) {
  module = angular.module('protrack', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('views/about.html',
    '<div class="container"><p>About Protrack</p></div>');
}]);
})();
