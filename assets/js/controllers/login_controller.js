angular.module("lm", [])
		.controller("lc", function ($scope, $http) {
			$scope.loginValidate = function()
			{
				console.log("validate")
			//	window.alert(res);
				data = {
					"uname" : $scope.uname,
					"pass" : $scope.pass
				};
				$http.post('../admin/login/ap', data).then(function (res) {
					window.alert(res);
					$scope.err = null;
					if(res)
					{
						if(res.data != "admin") {
							$scope.err = res.data;
						}
						else
						{
							sessionStorage.setItem("isLoggedIn", "admin");
						}
						console.log(res);
					}
					else
					{
						$scope.err = "Connection to Server lost, please try again letter";
					}
				});
			}
		});