'use strict';
angular.module('huguesApp')
	.config(function($stateProvider) {
		var states = [{
				name: 'home',
				data: {
					pageTitle: 'BIENVENIDO | MONITOREO SOFTV',
				},
				url: '/main',
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.diagnostic',
				data: {
					pageTitle: 'BIENVENIDO | MONITOREO SOFTV',
				},
				url: '/diagnostic',
				templateUrl: 'views/diagnostic/diagnostic.html',
				controller: 'DiagnosticCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.onsiteOne',
				data: {
					pageTitle: 'BIENVENIDO | MONITOREO SOFTV',
				},
				url: '/onsite/one',
				templateUrl: 'views/onsiteValidation/onsiteValidation.html',
				controller: 'OnsiteValidationCtrl',
				controllerAs: '$ctrl'
			},
			{
				name: 'home.onsiteTwo',
				data: {
					pageTitle: 'BIENVENIDO | MONITOREO SOFTV',
				},
				url: '/onsite/two',
				templateUrl: 'views/diagnostic/ValidationTool2.html',
				controller: 'ValidationTool2Ctrl',
				controllerAs: '$ctrl'
			}
		];
		states.forEach(function(state) {
			$stateProvider.state(state);
		});
	});
