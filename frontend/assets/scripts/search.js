angular
	.module('myApp', [])
	.controller(
		'SearchController',
		function ($scope) {
			const dataItems = [
				'Berikut Fashion Style Yang Dikenakan Dziko',
				'Wow Mengejutkan Ternyata Inilah Rahasia',
				'Cara Mudah Mendapatkan Style Terbaru',
				'Tren Fashion 2024 yang Harus Anda Coba',
			];

			$scope.searchQuery = '';
			$scope.searchResults = [];

			$scope.performSearch =
				function () {
					if (
						$scope.searchQuery.trim() !==
						''
					) {
						$scope.searchResults =
							dataItems.filter(
								function (item) {
									return item
										.toLowerCase()
										.includes(
											$scope.searchQuery.toLowerCase()
										);
								}
							);
					} else {
						$scope.searchResults = [];
					}
				};

			$scope.$watch(
				'searchQuery',
				function (newVal, oldVal) {
					if (newVal !== oldVal) {
						$scope.performSearch();
					}
				}
			);
		}
	);
