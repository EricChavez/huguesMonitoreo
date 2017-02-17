'use strict';
angular.module('huguesApp')
	.factory('diagnosticFactory', function($http, $q, globalService) {
		var factory = {};
		var paths = {
			getToken: '/HuguesRequest/GetToken',
			getCommand: '/HuguesRequest/TestMethod'
		};

		factory.getLoginUid = function() {
			var deferred = $q.defer();
			var config = {
				headers: {

				}
			};
			$http.get(globalService.getUrl() + paths.getToken).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		factory.getCommand = function(sanData) {
			var deferred = $q.defer();
			var Parametros = {
				'loginuuid': sanData.token,
				'san': sanData.san,
				'command': 'SDT',
				'operator_id': 'televera'
			}
			var config = {
				headers: {

				}
			};
			$http.post(globalService.getUrl() + paths.getCommand, JSON.stringify(Parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});

			return deferred.promise;
		};

		return factory;
	});
