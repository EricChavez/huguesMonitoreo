'use strict';
angular
	.module('huguesApp')
	.controller('OVTSingOffCtrl',
		function($uibModalInstance, $uibModal, token, OVTFactory, ngNotify) {
			alert('ok');
			this.$onInit = function() {

				var objv = {};
				objv.token = token;
				objv.url = 'sign_off.json';
				objv.Jdata = '';
				objv.method = 'OVTGET';
				OVTFactory.DataOVT(objv).then(function(data) {
					console.log(data);
				});

			}

			function cancel() {
				$uibModalInstance.dismiss('cancel');
			}


			var vm = this;
			vm.cancel = cancel;
		});
