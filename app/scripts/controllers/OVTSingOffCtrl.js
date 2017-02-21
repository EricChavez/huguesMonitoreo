'use strict';
angular
	.module('huguesApp')
	.controller('OVTSingOffCtrl',
		function($uibModalInstance, $uibModal, token, OVTFactory, ngNotify) {

			this.$onInit = function() {
				console.log(token);
				var objv = {};
				objv.token = token;
				objv.url = 'sign_off.json';
				objv.Jdata = '';
				objv.method = 'OVTGET';
				OVTFactory.DataOVT(objv).then(function(data) {
					var headers = JSON.parse(data);
					vm.headers = headers;
					vm.fso = headers.siteOrder.fso.
					vm.san = headers.san;
					vm.visittype = headers.siteOrder.visitType;
					console.log(headers);
				});

			}

			function cancel() {
				$uibModalInstance.dismiss('cancel');
			}

			function SingOff() {
				var data2 = {
					"signOffData": null,
					"fso": vm.fso,
					"createdBy": null,
					"createdDttm": null,
					"isAot": vm.visittype,
					"isBrokenConn": false,
					"isCablePrb": false,
					"isConnPrb": false,
					"isCustRefusedInstall": vm.customerRefused,
					"isDidNotPowerOn": false,
					"isDmgFeedhornOrCover": false,
					"isEquipSwRouterPrb": false,
					"isGbPrb": false,
					"isLineOfSight": vm.sight,
					"isModemLanPrb": false,
					"isModemSwInsProcPrb": vm.modemsoftware,
					"isMovedObstruction": false,
					"isNoProblem": vm.noinstallation,
					"isNoSignal": false,
					"isNoccT3CorrectedNwPrb": vm.NOCC,
					"isOther": vm.other,
					"isRadioShorted": false,
					"isReplacedDish": vm.dish,
					"isReplacedModem": vm.modem,
					"isReplacedPowerSupply": vm.power,
					"isReplacedRadio": vm.radio,
					"isRrCblconnGbWeather": vm.repaired,
					"isRrFeedhornPolarizer": vm.feedhorn,
					"modemSn": null,
					"notesCustEquipSwRouterPrb": vm.customersoft,
					"notesCustRefusedInstall": vm.DetailProblem,
					"notesInstallationDetails": vm.DetailProblem,
					"notesLineOfSight": vm.DetailProblem,
					"notesModemSwInsProcPrb": vm.DetailProblem,
					"notesNoccT3CorrectedNwPrb": vm.DetailProblem,
					"notesOther": vm.DetailProblem,
					"notesReplacedDish": vm.DetailProblem,
					"notesReplacedModem": vm.DetailProblem,
					"notesReplacedPowerSupply": vm.DetailProblem,
					"notesReplacedRadio": vm.DetailProblem,
					"notesRrCblconnGbWeather": vm.DetailProblem,
					"notesRrFeedhornPolarizer": vm.DetailProblem,
					"oduSn": null,
					"odusnCurr": null,
					"updatedBy": null,
					"updatedDttm": null
				};

				console.log(data2);

				var objv = {};
				objv.token = token;
				objv.url = 'install_sign_off/create.json';
				objv.Jdata = JSON.stringify({
					'signOffData': data2
				});
				objv.method = 'OVTPOST';
				OVTFactory.DataOVT(objv).then(function(data) {
					if (data == "ERROR") {
						ngNotify.set('The signoff installation cannot be performed', 'error');
					} else if (data == "") {
						console.log(data);
						ngNotify.set('The signoff installation has been permormed successful', 'success');
					} else {
						var error = JSON.parse(data);
						console.log(error);
						ngNotify.set(error.errors[0], 'grimace');
					}
				});
			};



			var vm = this;
			vm.cancel = cancel;
			vm.SingOff = SingOff;
		});
