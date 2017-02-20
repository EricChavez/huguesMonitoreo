'use strict';
angular.module('huguesApp')
	.controller('DiagnosticCtrl', function(diagnosticFactory, OVTFactory, ngNotify) {
		this.$onInit = function() {
			$('.diagnostic').collapse();
			$('.diagnosis').collapse();
			$('.table-info').collapse();
			diagnosticFactory.getLoginUid().then(function(data) {
				vm.token = data[0].loginuuid;
			});
		}

		function searchSan() {
			var sanData = {
				token: vm.token,
				san: vm.san
			};
			diagnosticFactory.getCommand(sanData).then(function(dataCommand) {
				var datos = JSON.parse(dataCommand);
				if (datos.length > 0) {
					vm.diagnosticData = datos[0];
					vm.showSan = true;
					var credentials = {
						userId: 'televera',
						password: 'televera',
						san: datos[0].SAN
					};
					OVTFactory.OVTToken(credentials).then(function(dataToken) {
						if (dataToken) {
							var dataJ = '{"antennaSize":"' + datos[0].Antenna_Size + '","mountType": "POLE"}';
							var obj = {
								token: dataToken,
								url: 'validate_antenna_mount.json ',
								Jdata: dataJ,
								method: 'OVTPOST'
							};
							OVTFactory.DataOVT(obj).then(function(dataOVT) {
								console.log(dataOVT);
							});
						}
					});
				} else {
					ngNotify.set('San data not found.', 'error');
					vm.showSan = false;
				}
			});
		}

		var vm = this;
		vm.searchSan = searchSan;
		vm.san = 'TEVTV0000003';
	});
