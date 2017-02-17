'use strict';
angular.module('huguesApp')
	.controller('DiagnosticCtrl', function(diagnosticFactory, ngNotify) {
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
					console.log(vm.diagnosticData);
					vm.showSan = true;
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
