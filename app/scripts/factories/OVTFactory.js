'use strict';
angular
	.module('huguesApp')
	.factory('OVTFactory', function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetToken: '/HuguesRequest/GetToken',
			GetOVTToken: '/OVTtoken/GetTokenOVT',
			DataOVT: '/OVT/OvtPost'
		};

		factory.OVTToken = function(credentials) {
			var deferred = $q.defer();
			var parametros = {
				'userId': credentials.userId,
				'password': credentials.password,
				'san': credentials.san
			};
			$http.post(globalService.getUrl() + paths.GetOVTToken, parametros).then(function(response) {
				var token = JSON.parse(response.data[0].token);
				$localStorage.currentData = {
					token: token.token
				};
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		factory.DataOVT = function(obj) {
			var deferred = $q.defer();
			var parametros = {
				'token': obj.token,
				'url': obj.url,
				'Jdata': obj.Jdata,
				'method': obj.method
			};
			$http.post(globalService.getUrl() + paths.DataOVT,
				parametros
			).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(response) {
				deferred.reject(response.data);
			});
			return deferred.promise;
		};

		return factory;
	});
