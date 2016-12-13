angular.module("feedback", [])
	.controller("feedback_controller", function ($scope, $http) {

		var feedbacks = {};
			$http.get('../../admin/feedback/getfeedback').then(function (res) {
			console.log(res);
			$scope.feedbacks = res.data;
			console.log("data sent to file");
		});

				$scope.feedbacks = feedbacks;
		$scope.confirmDelete = confirmDelete;
		/*var feedbacks = [{
			"user_name":"Mahesh Shah",
			"user_mailid":"mahesh@gmail.com"
			"feedback_content":"Thanks to Flipkart who deliver it me with in 5 days Good Phone With Metal Body And Best front Camera With Flash Best for night Selfie",
			"date":"2012-10-15T21:26:17Z"
		},
		{
			"user_name":"Shailes",
			"feedback_content":"And Best front Camera With Flash Best for night Selfie Thanks to Flipkart who deliver it me with in 5 days Good Phone With Metal Body " ,
			"user_mailid":"shailesh@gmail.com",
			"date":"2015-08-01T19:26:15Z"
		},
		{
			"user_name":"Fenil Gandhi",
			"user_mailid":"fenil@mail.com",
			"feedback_content":"deliver it me with in 5 days Good Phone With Thanks to Flipkart who deliver it me with in 5 days Good Phone With Metal Body And Best front Camera With Flash Best for night Selfie",
			"date":"2013-10-15T21:26:12Z"
		}
		];*/

		function confirmDelete(id, name){
		var C = confirm("Do You want to Delete"+name+"'s feedback?");
		if(C){
			$http.get('../../admin/feedback/delete/'+id).then(function (res) {
				console.log(name +"'s Feedback "+res.data);	

				$http.get('../../admin/feedback/getfeedback').then(function (res) {
				console.log(res);
				$scope.feedbacks = res.data;
			});

			});
			
		}
		else{
			
			console.log("deleting Canceled");
		}

		C = null;
	};
	

	});
