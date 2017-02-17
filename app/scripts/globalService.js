'use strict';
angular.module('huguesApp')
	.service('globalService', function() {
		var svc = {};

		svc.getUrlHugues = function() {;
			return 'http://localhost:50914/api';
		};


		return svc;
	});
