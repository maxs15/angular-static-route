(function(angular) {
    'use strict';

    angular.module('angular-static-route', [])
	.config(function ($routeProvider) {

		var originalWhen = $routeProvider.when;
		var firstLoad = true;
		var routesConfig = {};

		var staticRoute = function($q, $route, $rootScope, $window) {
		    var deferred = $q.defer();
		    var route = $route.current.$$route;
		    var sr = (!route.defaultParent || !route.event) ? false : true;

		    var done = function() {
			$window.history.back();
		    };

		    // If it is a static route, we call the event
		    if (sr)
			$rootScope.$broadcast(route.event, done);

		    // If that's the first load or that's not a static route, we resolve the promise to display the view
		    if (firstLoad || !sr)
			deferred.resolve('');

		    return deferred.promise;
		};


		$routeProvider.when = function(path, config) {
		    routesConfig[path] = config;
		    if (!config.resolve) config.resolve = {};
		    config.resolve.$staticRoute = staticRoute;
		    if (config.defaultParent && config.event) {
			var like = routesConfig[config.defaultParent];
			if (like) {
			    config.template = like.template;
			    config.templateUrl = like.templateUrl;
			    config.controller = like.controller;
			    for (var name in like.resolve) {
				if (name != '$staticRoute');
				config.resolve[name] = like.resolve[name];
			    }
			}
		    }
		    originalWhen(path, config);
		    return $routeProvider;
		};
  
	    });
})(angular);