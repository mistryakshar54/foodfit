angular.module("restaurant", [])	//rgkevin.datetimeRangePicker
	.config(function($locationProvider){
		$locationProvider.html5Mode(
		{
			enabled: true,
  			requireBase: false
		});
	})//add then successfully get url
	//add button directives
/*	.directive("addbuttonsbutton", function(){
		return {
				restrict: "E",
			//	scope:true,
				template: '<button addbuttons class="mdl-button-float mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">add</i></button>'
			}
	})
*/
//Directive for adding buttons on click that show an alert on click
	.directive("addbuttons", function($compile){

			return function(scope, element, attrs){

				element.bind("click", function(){
					scope.initializeFood();	
					//scope.count++;
					//scope.item[scope.count] = " ";
					angular.element(document.getElementById('space-for-buttons')).append(
						$compile(
								'<div class="halfrow mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'+
                '<input id="item1" class="mdl-textfield__input" type="text" name="itemid'+scope.count+'" ng-model="item['+scope.count+']" ng-change="searchFood(item['+scope.count+'], '+scope.count+')">'+
                '<label class="mdl-textfield__label" for="item'+scope.count+'">Item Id '+(scope.count+1)+'</label>'+
                '<ul class="results" ng-style="res['+scope.count+']">'+
                '<li class="mdl-layout" ng-repeat="food in foods['+scope.count+']" style="cursor:pointer;" ng-click="selectFood(food._id, food.item_name,'+scope.count+', food.nf_calories, food.food_category)" >{{food.item_name}}</li>'+
				'</ul></div>'+
				'<div class="halfrow mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'+
                '<input class="mdl-textfield__input" type="number" step="0.01" name="pricei'+scope.count+'" ng-model="menu['+scope.count+'].food_price">'+
                '<label class="mdl-textfield__label" for="sample3">Price '+(scope.count+1)+'</label>'+
                '</div>')(scope));
				});
			};
	})
	/*.directive("myDatetimeRange", function () {
		return {
			"time": {
		    "from": 480,
		    "to": 1155,
		    "dFrom": 0,
		    "dTo": 1440,
		    "step": 15,
		    "minRange": 15,
		    "hours24": false
		  },
		  "hasDatePickers": false,
		  "hasTimeSliders": true
		};
	})
	.directive("mapdirective", function (scope) {
		return {
			location: {
			    latitude: 23.022579,
			    longitude: 72.571456
			  },
			  locationName: "",
			  radius: 0,
			  zoom: 15,
			  scrollwheel: true,
			  inputBinding: {
			    latitudeInput: scope.lat,//$('#lat'),
			    longitudeInput: scope.long,//$('#long'),
			      radiusInput: null,
			      locationNameInput: scope.address//$('#address')
			  },
			  //enable<a href="http://www.jqueryscript.net/tags.php?/autocomplete/">Autocomplete</a>: false,
			  enableAutocompleteBlur: true,
			  enableReverseGeocode: true,
			  draggable: true,
			  // must be undefined to use the default gMaps marker
			  markerIcon: undefined
		}
	})
*/
	.controller("restaurant_controller", function ($scope, $http, $location) {

		var restaurants = {};
		//var lat = 50;
		$scope.lat = 23.0225;

		$scope.long = 72.5606;
		$scope.fid = null;
		/*$scope.setOtime = function (ot)
		{
			$scope.otime = ot;
			console.log($scope.otime);
		}
		*/
		$scope.count = 2;
		$scope.res = [];
		$scope.res[0] = $scope.res[1] = $scope.res[2] = {
			"display":"none",
			"position":"absolute"
				};
		$scope.initialize = initialize;
		function initialize() {
				$scope.name = " ";
				$scope.address = " ";
				$scope.lat = " ";
				$scope.long = " ";
				$scope.phone = 0;
				$scope.email = "abc@xyz.com";
				$scope.owner_email = "abc@xyz.com";
				$scope.website = " ";
				$scope.otime = " ";
				$scope.ctime = " ";
				$scope.city = " ";
				$scope.itemid1 = " ";
				$scope.pricei1 = " ";
				$scope.itemid2 = " ";
				$scope.pricei2 = " ";
				$scope.itemid3 = " ";
				$scope.pricei3 = " ";
				$scope.zipcode = 0;
			}

		
			// body...
		$scope.submitForm = function()
		{

			var data = {
				"name" : $scope.name,
				"address" : $scope.address,
				"lat" : $scope.lat,
				"long" : $scope.long,
				"phone" : $scope.phone,
				"email" : $scope.email,
				"owner_email" : $scope.owner_email,
				"website" : $scope.website,
				"otime" : $scope.otime,
				"ctime" : $scope.ctime,
				"city" : $scope.city,
				"menu" : $scope.menu,
				"zipcode" : $scope.zipcode
			};
			console.log(data);
			$http.post('../../admin/rest/add', data).then(function () {
				console.log("added successfully");
			});
		}


		$scope.updateRestInfo = function()
		{

			var data = {
				"id" : $scope.fid,
				"name" : $scope.name,
				"address" : $scope.address,
				"lat" : $scope.lat,
				"long" : $scope.long,
				"phone" : $scope.phone,
				"email" : $scope.email,
				"owner_email" : $scope.owner_email,
				"website" : $scope.website,
				"otime" : $scope.otime,
				"ctime" : $scope.ctime,
				"city" : $scope.city,
				"menu" : $scope.menu,
				"zipcode" : $scope.zipcode
			};
			console.log(data);
			$http.post('../../admin/rest/update', data).then(function () {
				console.log("added successfully");
			});
		}


		$http.get('../../admin/rest/getrest').then(function (res) {
			$scope.restaurants = res.data;
		});


		function getRest() {
			var id = $location.search();
			console.log(id.id);
			$http.get('../../admin/rest/update/'+id.id).then(function (res) {

				$scope.fid = res.data._id;
				$scope.name = res.data.rest_name;
				$scope.address = res.data.rest_address;
				$scope.lat = res.data.rest_loc_lat;
				$scope.long = res.data.rest_loc_long;
				$scope.phone = res.data.phoneno;
				$scope.email = res.data.rest_email;
				//opening_status : req.body.open,
				$scope.owner_email = res.data.owner_mail_id;
				$scope.website = res.data.restraunt_website;
				$scope.otime = res.data.rest_open_time;
				$scope.ctime = res.data.rest_close_time;
				$scope.city = res.data.rest_city;
				$scope.menu = res.data.rest_menu;
				$scope.count = $scope.menu.length-1;
				/*$scope.itemid1 = res.data.rest_menu.food_id_1;
				$scope.pricei1 = res.data.rest_menu.food_price_1;
				$scope.itemid2 = res.data.rest_menu.food_id_2;
				$scope.pricei2 = res.data.rest_menu.food_price_2;
				$scope.itemid3 = res.data.rest_menu.food_id_3;
				$scope.pricei3 = res.data.rest_menu.food_price_3;
				*/
				$scope.zipcode = Number(res.data.zipcode);
		
			});
		}
		/*$scope.time =  {
		  "time": {
		    "from": 1005,
		    "to": 1020,
		    "dFrom": 0,
		    "dTo": 1440,
		    "step": 15,
		    "minRange": 15,
		    "hours24": false
		  },
		  "hasDatePickers": false,
		  "hasTimeSliders": true
		};

*/
		function updateRest(id, name){

			console.log("before form called");

			console.log(name + " is requested for update");
			window.location.replace('../../admin/views/update_rest.html?id='+id);

			//	$scope.foods = res.data;

		}
		function addForm() {
			window.location.replace('../../admin/views/add_rest.html');
		}


		 function confirmRestDelete(id, name) {
			var C = confirm(name +" do you want to delete?");
			if(C)
			{
				console.log("deleted succefully");
				$http.get('../../admin/rest/delete/'+id).then(function (res) {
					console.log(name +" is "+res.data);
				});

				$http.get('../../admin/rest/getrest').then(function (res) {
						$scope.restaurants = res.data;
				});
			}
			else
			{
				console.log("deleting Canceled");
			}
				C = null;
		}

		$scope.searchFood = function(sfood, i) {
		//	console.log("searching "+food);

			console.log("food is :"+sfood+" with trim "+sfood.trim());
			if (sfood == null || sfood.trim()=="") {
				$scope.res[i] = {
					"display":"none"
					
				};
			}
			else
			{
				$scope.res[i] = { 
					"display" : "block",
					"position": "absolute",
				    "top": "71%",
				    "left": "0",
				    "right": "0",
				    "z-index": "10",
				    "padding": "0",
				    "margin": "0",
				    "border-width": "1px",
				    "border-style": "solid",
				    "border-color": "#cbcfe2 #c8cee7 #c4c7d7",
				    "border-radius": "3px",
				    "background-color": "#fdfdfd",
				    "-webkit-box-shadow": "0 1px 2px rgba(0, 0, 0, 0.1)",
				    "-moz-box-shadow": "0 1px 2px rgba(0, 0, 0, 0.1)",
				    "-ms-box-shadow": "0 1px 2px rgba(0, 0, 0, 0.1)",
				    "-o-box-shadow": "0 1px 2px rgba(0, 0, 0, 0.1)",
				    "box-shadow": "0 1px 2px rgba(0, 0, 0, 0.1)"
				 };
				$http.get('../../admin/food/search/'+sfood).then(function (res) {
					$scope.foods[i] = res.data;
				});
			}
		}

		$scope.selectFood = function (id, name, i, cal, cat){
			$scope.res[i] = {
				"display":"none"
				
			};
			//$scope.item[i] = name;
			if($scope.menu[i] == null){
				$scope.menu[i] = {food_id : id, food_name:name, food_price:null, food_cal:cal, food_cat:cat};
			}
			$scope.menu[i].food_id = id;
			$scope.menu[i].food_name = name;
			$scope.menu[i].food_cal = cal;
			$scope.menu[i].food_cat = cat;
			$scope.item[i] = name;
		//	$scope.menu.push({"food_id":id,"food_price":name});
			console.log(i+" select food id "+id+" name is "+$scope.menu[i].food_name+" name "+$scope.item[i]+"cat"+$scope.menu[i].food_cat+"cal"+$scope.menu[i].food_cal);
		}

		$scope.initializeFood = function()
		{	
			$scope.count++;
			$scope.menu[$scope.count] = {food_id:0,food_name:"",food_price:null, food_cat:null, food_cal:null};
			console.log($scope.menu[$scope.count]);
		}
	/*	$scope.addElement = function(id, price,i){
			console.log(id + " " + price+ " " +i);
			$scope.menu.push({"food_id":id,"food_price":price});
		}
*/
		//$scope.menu = [{"id":"1","p":"200"},{"id":"2","p":"300"}];
		/*	$scope.lat = $scope.lat;
			$scope.long = $scope.long;
		  $scope.locationpickerOptions = {
                location: {
                    latitude: $scope.lat,
                       longitude: $scope.long
        	       },
            	inputBinding: {
          //          latitudeInput: $('#lat'),
        //            longitudeInput: $('#long'),
              //      radiusInput: $('#us3-radius'),
      //              locationNameInput: $('#address')
                },
                radius: 0,
                enableAutocomplete: true
        }*/

		$scope.foods = [];
		$scope.menu = [];
		$scope.item = [];
		$scope.menu[0] = {food_id:0,food_name:"",food_price:null};
		$scope.menu[1] = {food_id:0,food_name:"",food_price:null};
		$scope.menu[2] = {food_id:0,food_name:"",food_price:null};
		$scope.confirmRestDelete = confirmRestDelete;
		$scope.restaurants = restaurants;
		$scope.getRest = getRest;
		$scope.addForm = addForm;
		$scope.updateRest= updateRest;


});
