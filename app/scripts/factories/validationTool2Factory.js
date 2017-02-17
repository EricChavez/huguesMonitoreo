'use strict';
angular
	.module('huguesApp')
	.factory('OVTFactory', function($http, $q, globalService) {
		var factory = {};
		var paths = {
			GetToken: '/HuguesRequest/GetToken',
			GetOVTToken: '/OVTtoken/GetTokenOVT',


		};

		factory.OVTToken = function() {
			var deferred = $q.defer();
			$http.get(globalService.getUrlHugues() + paths.GetOVTToken).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		}

		// factory.Postexample = function(id) {
		// 	var deferred = $q.defer();
		//
		// 	var parametros = {
		// 		'loginuuid': id,
		// 		'san': 'TEVTV0000003',
		// 		'command': 'SDT',
		// 		'operator_id': 'televera'
		// 	}
		//
		// 	$http.post(globalService.getUrlToken() + paths.test,
		// 		parametros
		// 	).then(function(response) {
		// 		deferred.resolve(response.data);
		// 	}).catch(function(response) {
		// 		deferred.reject(response.data);
		// 	});
		// 	return deferred.promise;
		//
		// }



		return factory;
	});
