(function (A) {
	"use strict";
	let app = A.module('searchApp', ['ngResource', 'ngSanitize', 'LocalStorageModule']);

	app.controller("searchAppCtrl", function ($scope, $resource, localStorageService) {
		const url = "http://dev2.poiskznakov.ru/api-rest/test-me/";
		let resource = $resource(url),
			store = localStorageService,
			messages = {
				load : "<div class='alert alert-info'>Загрузка...</div>",
				noFound : "<div class='alert alert-warning'>Ничего не найдено</div>",
				noServer : "<div class='alert alert-danger'>Сервер временно недоступен</div>"
			};

		A.extend($scope, {
			message : "",
			searchType : store.get("searchType") || "",
			searchTypes : [{ id : "", title : "Все"},
				{id : "wdesc", title : "По словесному элементу"}, 
				{id : "owner", title : "По владельцу"},
				{id : "document_number", title : "По номеру документа"}],
			httpError : false	
		});

		function _params() {
			return $scope.searchType ? {stype: $scope.searchType} : {};	
		};

		function _updateItems() {
			$scope.message = ($scope.items && $scope.items.length) ? "" : messages.noFound;
		};

		function _onError(error) {
			$scope.httpError = true;
			$scope.message = messages.noServer;
		};

		function _cleanErrors() {
			$scope.message = messages.load;
			$scope.noFound = "";
			$scope.httpError = false;
		};

		$scope.getItems = function(){
			_cleanErrors();
			$scope.items = resource.query(_params(), _updateItems, _onError);
			store.set("searchType", $scope.searchType);
		};

		$scope.getTypeTitle = function(id) {
			let title = "";
			A.forEach($scope.searchTypes, function(value, key) {
				if (value && value.id === id) { title = value.title; return; }
			});
			return title;
		};

		$scope.formatDate = function(date) {
			let newDate = A.isString(date) ? date.split(".").reverse().join("-") : "";			
			return newDate;
		};

		$scope.getItems();   	

	});
}(this.angular));