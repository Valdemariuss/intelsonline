(function (A) {
    "use strict";
    var app = A.module('searchApp', ['ngResource']);

	app.controller("searchAppCtrl", function($scope, $resource){
		$scope.load = "Загрузка";
		$scope.url = "http://dev2.poiskznakov.ru/api-rest/test-me/";
		$scope.params = {};
		$scope.searchType = "";
		$scope.searchTypes = [{
				id : "",
				title : "Все"
			}, {
				id : "wdesc",
				title : "По словесному элементу"			
			}, {
				id : "owner",
				title : "По владельцу"
			}, {
				id : "document_number",
				title : "По номеру документа"
			}];
		$scope.updateItems = function() {
			console.warn($scope.items);
			if($scope.items.length){
				$scope.load = "";
			} else {
				$scope.load = "Ничего не найдено";	
			}
		};
		$scope.getItems = function(){
			$scope.load = "Загрузка";
			$scope.noFound = "";
			$scope.items = $resource($scope.url).query($scope.params, $scope.updateItems); 
		};
		$scope.updateType = function() {
			console.warn($scope.searchType);
			$scope.params = $scope.searchType ? {stype: $scope.searchType} : {};
			$scope.getItems();
		};

		$scope.getTypeTitle = function(id) {
			var title = "";
			A.forEach($scope.searchTypes, function(value, key) {
				if(value && value.id === id){
					title = value.title;
					return;
				}
			});
			return title;
		};

		$scope.getItems();   	

	});
}(this.angular));