'use strict';

/**
 * @ngdoc function
 * @name huguesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the huguesApp
 */
angular.module('huguesApp')
	.controller('OVTCtrl', function(NgMap, OVTFactory) {

		// var chicago = new google.maps.LatLng(41.850033, -87.6500523);
		// vm.points = [{
		// 	"name": "Canberra",
		// 	"latitude": 'S2327.800/-23.6',
		// 	"longitude": 'W4700.640/-47'
		// }];
		//
		// vm.customIcon = {
		// 	"scaledSize": [32, 32],
		// 	"url": "http://icons.iconarchive.com/icons/paomedia/small-n-flat/24/map-marker-icon.png"
		// };
		// NgMap.getMap().then(function(map) {
		// 	vm.map = map;
		// });



		function GetDetails() {
			var credentials = {};
			credentials.userId = 'televera';
			credentials.password = 'televera';
			credentials.san = '123456';

			OVTFactory.OVTToken(credentials).then(function(data) {
				vm.datasend = data[0].DataSend;
				var token = JSON.parse(data[0].token);
				var Jdata = JSON.parse(data[0].DataSend);
				vm.OVTToken = token.token;
				var obj = {};
				obj.token = vm.OVTToken;
				obj.url = 'confirmation.json'
				obj.Jdata = JSON.stringify(Jdata);
				obj.method = 'OVTGET';
				console.log(obj);


				OVTFactory.DataOVT(obj).then(function(data) {
					console.log(data);
				});

			});
		}



		var vm = this;
		GetDetails();


	});
