angular.module("food", [])
	.config(function($locationProvider){
		$locationProvider.html5Mode(
		{
			enabled: true,
  			requireBase: false
		});
	})//add then successfully get url
	.controller("food_controller", function ($scope, $http, $location) {

		$scope.fname = " ";
		$scope.calories = " ";
		$scope.calfat = " ";
		$scope.fat = " ";
		$scope.carbs = " ";
		$scope.fiber= " ";
		$scope.protein =  " ";
		$scope.vitamin_a = " ";
		$scope.vitamin_c =" ";
		$scope.calcium = " ";
		$scope.iron = " ";
		$scope.serving = " ";


		var foods={};
		var food={};
		//ajax request to append data form route admin/food/data
		$http.get('../../admin/food/getfood').then(function (res) {
			$scope.foods = res.data;
		});

		function getfood() {
			var id = $location.search();
			console.log(id.id);
			$http.get('../../admin/food/update/'+id.id).then(function (res) {

				$scope._id = res.data._id,
				$scope.fname = res.data.item_name,
				$scope.calories = res.data.nf_calories ,
				$scope.calfat = res.data.nf_calories_from_fat,
				$scope.fat = res.data.nf_total_fat,
				$scope.carbs = res.data.nf_total_carbohydrate,
				$scope.fiber= res.data.nf_dietary_fiber ,
				$scope.protein = res.data.nf_protein ,
				$scope.vitamin_a = res.data.nf_vitamin_a_dv ,
				$scope.vitamin_c = res.data.nf_vitamin_c_dv ,
				$scope.calcium = res.data.nf_calcium_dv,
				$scope.iron = res.data.nf_iron_dv,
				$scope.serving = res.data.nf_serving_weight_grams
			//	res.data.nutritional_density = final_nv

				// 		$scope.fname = res.data.item_name;
					//	$scope.calories = res.data.
						console.log("after form called"+$scope.food.fname);
				});

		}

		function updateFood(id, name){

			console.log("before form called");

			console.log(name + " is requested for update");
			window.location.replace('./views/update_food.html?id='+id);

			//	$scope.foods = res.data;

		}




		//confirm delete function for deleteing food item
		function confirmFoodDelete(id, name){
			var C = confirm(name+" do you want to delete?");
			if(C){
				$http.get('../../admin/food/delete/'+id).then(function (res) {
					console.log(name +" is "+res.data);
					$http.get('../../admin/food/getfood').then(function (res) {
						$scope.foods = res.data;
					});

				});
			}
			else{
				console.log("deleting Canceled");
			}

				C = null;
		}
		
		//to add form
		function addForm() {
			window.location.replace('./views/manage_food.html');
		}

		$scope.food = food;
		$scope.foods = foods;
		$scope.confirmFoodDelete = confirmFoodDelete;
		$scope.updateFood = updateFood;
		$scope.getfood = getfood;
		$scope.addForm = addForm;
});
