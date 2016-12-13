var app = angular.module("homepage", ["ngRoute"])
		.config(function($routeProvider) {
		//	$locationProvider.html5Mode(true);
			$routeProvider
				.when("/", {
					templateUrl : "/",
					controller : "homeController"
				})
				.when("/manage_food", {
					templateUrl : "../views/manage_food.html",
					controller : "foodController"
				})
				.when("/manage_restaurant", {
					templateUrl : "../views/manage_restaurant.html",
					controller : "restaurantController"
				})				
				.when("/manage_feedback", {
					templateUrl : "feedback",
					controller : "feedbackController"
				})
				.otherwise({
					redirectTo : "/home"
				})

		});/*
		.controller("foodController", function ($scope) {
			// body...
		})
		.controller("restaurantController", function ($scope) {
			// body...
		})
		.controller("feedbackController", function ($scope) {
			// body...
		});

		*/