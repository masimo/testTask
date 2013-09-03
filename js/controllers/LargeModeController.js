'use strict';


demoTask.controller('LargeModeController', function NormalModeController($scope, $http, $filter) {

	$scope.pagina = 20;
	$scope.paginationBut = 7;
	$scope.activePage = 0;

	var records = $scope.records;
	var filter = $scope.filter = {};


	$scope.$watch('filter', filterAndSortData, true);


	$scope.$watch('records', function() {

		if ($scope.records === 0) {
			$scope.pages = 0;
			return false
		}

		$scope.pages = Math.ceil($scope.records / $scope.pagina) - 1;
		$scope.activePage = $scope.activePage > $scope.pages ? $scope.pages : $scope.activePage;

	});


	function filterAndSortData() {

		(function() { // sort


			$scope.userData.sort(function(a, b) {
				if (a[filter.sortBy] > b[filter.sortBy]) {
					return filter.sortAsc ? 1 : -1;
				}

				if (a[filter.sortBy] < b[filter.sortBy]) {
					return filter.sortAsc ? -1 : 1;
				}

				return 0;
			});



		})();

	};

	$scope.sortBy = function(key) {
		if (filter.sortBy === key) {
			filter.sortAsc = !filter.sortAsc;
		} else {
			filter.sortBy = key;
			filter.sortAsc = true;
		}
	};

	$scope.sortIconFor = function(key) {
		if (filter.sortBy !== key) {
			return '';
		}

		return filter.sortAsc ? '\u25B2' : '\u25BC';
	};



	$scope.init = function() {
		$scope.activePage = 0;
		$scope.userData = [];

		$http({
			method: 'GET',
			url: 'data/data_l.json'
		}).
		success(function(data, status, headers, config) {

			angular.forEach(data, function(value, key) {

				if (!key) return;

				$scope.userData.push({
					id: value[0],
					name: value[1],
					price: value[2],
					bid: value[3]
				});

			});


			$scope.pages = Math.ceil($scope.userData.length / $scope.pagina) - 1;


		}).
		error(function(data, status, headers, config) {
			console.log('crashed');
		});

	}



	$scope.init();



});