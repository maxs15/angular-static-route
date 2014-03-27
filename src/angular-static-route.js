(function(angular) {
	'use strict';

	var history = [];

	angular.module('angular-static-route', [])
	.config(function ($routeProvider) {

		var originalWhen = $routeProvider.when;
		var firstLoad = true;
		var routesConfig = {};
		var mainRoute = null;

		var staticRoutePromise = function($q, $route, $rootScope, $window, $location) {
			var deferred = $q.defer();
			var route = $route.current.$$route;
			var sr = (route && route.event && route.defaultParent) ? true : false;
			var sor = false;

			if (history.length >= 2) {
				var item = routesConfig[history[history.length - 2]];
				if (item && item.event && item.defaultParent) {
					if (item.onChange) $rootScope.$broadcast(item.onChange);
				}
			}

			// If it is a static route, we call the event
			if (sr)
				$rootScope.$broadcast(route.event, history.length);

			// If that's the first load or that's not a static route, we resolve the promise to display the view
			if (firstLoad || (!sr && !sor)) {
				deferred.resolve('');
			}
			if (firstLoad)
				firstLoad = false;

			return deferred.promise;
		};

		$routeProvider.when = function(path, config) {
			routesConfig[path] = config;
			if (!config.resolve) config.resolve = {};
			config.resolve.$staticRoutePromise = staticRoutePromise;
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

	})
	.run(function ($rootScope, $route, $location) {
		
		$rootScope.$on('$locationChangeSuccess', function(event) {
			if ($route.current && $route.current.$$route && $route.current.$$route.originalPath)
				history.push($route.current.$$route.originalPath);
		});

	});

})(angular);