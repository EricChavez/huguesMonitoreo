'use strict';
angular.module('huguesApp')
	.service('globalService', function() {
		var svc = {};
		svc.getUrl = function() {
			return 'http://192.168.50.60:5000/api';
		};
		return svc;
	});
