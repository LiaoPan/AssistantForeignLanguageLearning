angular.module('app.directives', [])

.directive("myStopButton",function() {
			return {
                restrict: "E",
                require: "^videogular",
                template: "<div class='iconButton' ng-click='API.stop()'>cc</div>",
                link: function(scope, elem, attrs, API) {
                    scope.API = API;
                }
			}
});
