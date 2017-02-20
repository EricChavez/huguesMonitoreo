'use strict';

/**
 * @ngdoc overview
 * @name huguesApp
 * @description
 * # huguesApp
 *
 * Main module of the application.
 */
angular
	.module('huguesApp', [
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'blockUI',
		'angular-loading-bar',
		'ngNotify',
		'ngMap',
		'ui.bootstrap'
		'ngStorage'
	])
	.config(['$provide', '$urlRouterProvider', '$httpProvider', 'cfpLoadingBarProvider', '$qProvider', function($provide, $urlRouterProvider, $httpProvider, cfpLoadingBarProvider, $qProvider) {
		$urlRouterProvider.otherwise('/main');
		cfpLoadingBarProvider.includeSpinner = false;
		$qProvider.errorOnUnhandledRejections(false);
		$provide.factory('ErrorHttpInterceptor', function($q, $injector) {
			function notifyError(rejection) {
				var notify = $injector.get('ngNotify');
				var content = '¡Se ha generado un error! \n' + rejection.data;
				notify.set(content, {
					type: 'error',
					duration: 4000
				});
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					sessionStorage.clear();
					return $q.reject(rejection);
				}
			};
		});
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}])
	.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
	}]);
