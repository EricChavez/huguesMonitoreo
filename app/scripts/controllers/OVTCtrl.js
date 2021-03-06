'use strict';

/**
 * @ngdoc function
 * @name huguesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the huguesApp
 */
angular.module('huguesApp')
	.controller('OVTCtrl', function(NgMap, OVTFactory, $uibModal, ngNotify) {




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
				obj.url = 'confirmation.json';
				obj.Jdata = JSON.stringify(Jdata);
				obj.method = 'OVTGET';
				OVTFactory.DataOVT(obj).then(function(data) {
					var detallecb = JSON.parse(data);
					vm.Details = detallecb;
					var obj = {};
					obj.token = vm.OVTToken;
					obj.url = 'antennas/list.json';
					obj.Jdata = '';
					obj.method = 'OVTGET';
					OVTFactory.DataOVT(obj).then(function(data) {
						var antennas = JSON.parse(data);
						vm.antennas = antennas;

						var objmount = {};
						objmount.token = vm.OVTToken;
						objmount.url = 'mounts/list.json';
						objmount.Jdata = '';
						objmount.method = 'OVTGET';
						OVTFactory.DataOVT(objmount).then(function(datamount) {

							var mounts = JSON.parse(datamount);
							vm.mounts = mounts;

						});
					});

				});

			});
		}

		function getPing() {
			var obj = {};
			obj.token = vm.OVTToken;
			obj.url = 'terminal/ping.json';
			obj.Jdata = '';
			obj.method = 'OVTGET';
			OVTFactory.DataOVT(obj).then(function(data) {
				var det = JSON.parse(data);
				ngNotify.set('Ip Address:' +
					det.ipAddress + ' Terminal Status:' + det.terminalStatus);

			});
		}

		function getRefresh() {
			var obj = {};
			obj.token = vm.OVTToken;
			obj.url = 'refresh_confirmation.json';
			obj.Jdata = '';
			obj.method = 'OVTGET';
			OVTFactory.DataOVT(obj).then(function(data) {
				ngNotify.set('Refresh success');

			});
		}



		function abrirSignOff() {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/onsiteValidation/SignOff.html',
				controller: 'OVTSingOffCtrl',
				controllerAs: 'ctrl',
				backdrop: 'static',
				keyboard: false,
				size: "lg",
				resolve: {
					token: function() {
						return vm.OVTToken;
					}
				}
			});
		}



		function Procced() {
			if (vm.antenna === undefined || vm.mount === undefined) {
				ngNotify.set('Complete step two and step three.', 'error');
			} else {
				vm.OVT1 = false;
				vm.OVT2 = true;
				vm.lat = vm.Details.terminal.location.latitudeDMS;
				vm.lon = vm.Details.terminal.location.longitudeDMS;

				vm.points = {
					"name": "SATV",
					"latitude": '21.927982539177396',
					"longitude": '-102.29935909851838'
				};

				vm.customIcon = {
					"scaledSize": [32, 32],
					"url": "http://icons.iconarchive.com/icons/paomedia/small-n-flat/24/map-marker-icon.png"
				};
				NgMap.getMap().then(function(map) {
					var latlng = new google.maps.LatLng(21.927982539177396, -102.29935909851838);
					map.setCenter(latlng);
					vm.map = map;
				});


				var auxMount = vm.mount.substring(0, vm.mount.length - 1);
				var d = "{" +
					'"antennaSize"' +
					':' +
					vm.antenna +
					',"mountType"' +
					':' +
					'"' + auxMount + '"' +
					'}';
				var obj = {};
				obj.token = vm.OVTToken;
				obj.url = 'validate_antenna_mount.json';
				obj.Jdata = d;
				obj.method = 'OVTPOST';
				OVTFactory.DataOVT(obj).then(function(data) {
					var result = JSON.parse(data);
					if (result.valid === true) {
						vm.OVT1 = false;
						vm.OVT2 = true;
						var objv = {};
						objv.token = vm.OVTToken;
						objv.url = 'validation.json';
						objv.Jdata = '';
						objv.method = 'OVTGET';
						OVTFactory.DataOVT(objv).then(function(data) {
							var DetailsOVT = JSON.parse(data);
							vm.DetailsOVT2 = DetailsOVT;
							vm.RecomendedDiag = vm.DetailsOVT2.diagnosis.recommendedAction.name;
							vm.IdDiagnosis = vm.DetailsOVT2.diagnosis.recommendedAction.recommActionId;
							google.maps.event.trigger(vm.map, 'resize');
						});
					} else {
						ngNotify.set('The antenna size and Mount is not valid', 'error');
						vm.OVT1 = true;
						vm.OVT2 = false;
					}
				});
			}
		}

		function GetCurrentStats() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'current_stats_validation.json';
			objv.Jdata = '';
			objv.method = 'OVTGET';
			OVTFactory.DataOVT(objv).then(function(data) {
				ngNotify.set('The information has been updated', 'success');
				var DetailsOVT = JSON.parse(data);
				vm.DetailsOVT2 = DetailsOVT;
				vm.RecomendedDiag = vm.DetailsOVT2.diagnosis.recommendedAction.name;
			});
		}

		function ForceRange() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'terminal/force_range.json';
			objv.Jdata = '';
			objv.method = 'OVTPUT';
			OVTFactory.DataOVT(objv).then(function(data) {

				if (data === "ERROR") {
					ngNotify.set('The force range method cannot be performed', 'error');
				} else if (data === "") {

					ngNotify.set('The force range  method has been permormed successful', 'success');
				} else {
					var error = JSON.parse(data);
					ngNotify.set(data, 'grimace');
				}
			});
		}

		function ClearTerminal() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'terminal/clear_stats.json';
			objv.Jdata = '';
			objv.method = 'OVTPUT';
			OVTFactory.DataOVT(objv).then(function(data) {

				if (data === "ERROR") {
					ngNotify.set('The clear stats method cannot be performed', 'error');
				} else if (data === "") {

					ngNotify.set('The clear stats method has been permormed successful', 'success');
				} else {
					var error = JSON.parse(data);
					ngNotify.set(error.errors[0], 'grimace');
				}


			});
		}

		function ReloadTables() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'terminal/reload_tables.json';
			objv.Jdata = '';
			objv.method = 'OVTPUT';
			OVTFactory.DataOVT(objv).then(function(data) {
				if (data === "ERROR") {
					ngNotify.set('The reload tables method cannot be performed', 'error');
				} else if (data === "") {

					ngNotify.set('The reload tables method has been permormed successful', 'success');
				} else {
					var error = JSON.parse(data);
					ngNotify.set(error.errors[0], 'grimace');
				}

			});


		}

		function ForceFallBack() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'terminal/force_fallback.json';
			objv.Jdata = '';
			objv.method = 'OVTPUT';
			OVTFactory.DataOVT(objv).then(function(data) {
				if (data === "ERROR") {
					ngNotify.set('The force fallback method cannot be performed', 'error');
				} else if (data === "") {
					ngNotify.set('The force fallback method has been  permormed successful', 'success');
				} else {
					var error = JSON.parse(data);

					ngNotify.set(error.errors[0], 'grimace');
				}

			});
		}

		function Reboot() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'terminal/terminal/reboot.json';
			objv.Jdata = '';
			objv.method = 'OVTPUT';
			OVTFactory.DataOVT(objv).then(function(data) {
				if (data === "ERROR") {
					ngNotify.set('The force reboot method cannot be performed', 'error');
				} else if (data === "") {
					ngNotify.set('The reboot method has been  permormed successful', 'success');
				} else {
					var error = JSON.parse(data);

					ngNotify.set(error.errors[0], 'grimace');
				}

			});
		}

		function CompleteAction() {
			var objv = {};
			objv.token = vm.OVTToken;
			objv.url = 'complete_action.json';
			objv.Jdata = '{"actionId" : ' + vm.IdDiagnosis + '}';
			objv.method = 'OVTPOST';
			OVTFactory.DataOVT(objv).then(function(data) {

				if (data === "ERROR") {
					ngNotify.set('The completed action method cannot be performed', 'error');
				} else if (data === "") {
					ngNotify.set('The completed action method has been  permormed successful', 'success');
				} else {
					var error = JSON.parse(data);

					ngNotify.set(error.errors[0], 'grimace');
				}

			});
		}

		var vm = this;
		vm.getPing = getPing;
		vm.getRefresh = getRefresh;
		vm.Procced = Procced;
		vm.OVT1 = true;
		vm.showmapa = false;
		vm.abrirSignOff = abrirSignOff;
		vm.GetCurrentStats = GetCurrentStats;
		vm.ForceRange = ForceRange;
		vm.ClearTerminal = ClearTerminal;
		vm.ReloadTables = ReloadTables;
		vm.ForceFallBack = ForceFallBack;
		vm.Reboot = Reboot;
		vm.CompleteAction = CompleteAction;
		GetDetails();

	});
