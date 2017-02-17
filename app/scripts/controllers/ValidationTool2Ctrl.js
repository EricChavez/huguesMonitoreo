'use strict';

/**
 * @ngdoc function
 * @name huguesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the huguesApp
 */
angular.module('huguesApp')
	.controller('ValidationTool2Ctrl', function(NgMap, ValidationTool2Factory) {
		var vm = this;
		var chicago = new google.maps.LatLng(41.850033, -87.6500523);
		vm.points = [{
			"name": "Canberra",
			"latitude": 'S2327.800/-23.6',
			"longitude": 'W4700.640/-47'
		}];

		vm.customIcon = {
			"scaledSize": [32, 32],
			"url": "http://icons.iconarchive.com/icons/paomedia/small-n-flat/24/map-marker-icon.png"
		};
		NgMap.getMap().then(function(map) {
			vm.map = map;
		});

		function GetOVTToken() {
			ValidationTool2Factory.OVTToken().then(function(data) {
				vm.datasend = data[0].DataSend;
				var token = JSON.parse(data[0].token);
				vm.OVTToken = token.token;

				console.log(vm.datasend);
				console.log(vm.OVTToken);

			});
		}


		GetOVTToken();


	});
