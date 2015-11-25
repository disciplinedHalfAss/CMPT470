angular.module('mainApp', [])
.controller('navbarCtrl', ['$scope', function ($scope) {
	$scope.index;
	$scope.setIndex = function(i){
		$scope.index = i;
	}	
}])
.controller('searchCtrl', ['$scope', function ($scope) {
	$scope.universities = 	[{name: 'SFU', id: 0 },
							{ name: 'UBC', id: 1 }];
							
	$scope.departments =	[{name: 'MATH', id: 0 },
							{ name: 'ECON', id: 1 },
							{ name: 'PHYS', id: 2 }];
							
	$scope.courses =	[{name: '238', id: 0 },
						{ name: '300', id: 1 },
						{ name: '338', id: 2 }];
						
	$scope.sortOptions = 	[{name: 'Price: low to high', id: 0},
							{name: 'Price: high to low', id: 1},
							{name: 'Avg. user review', id: 2},
							{name: 'Newest postings', id: 3}]
	
	$scope.selectedUniversity;
	$scope.selectedDepartment;
	$scope.selectedCourse;
	$scope.selectedSortOption;
	
	$scope.universityChanged = function(){

	}
	$scope.departmentChanged = function(){
		
	}
	$scope.courseChanged = function(){
		
	}
	$scope.sortOrder = function(){
		
	}
}])
.controller('booksIndexCtrl', ['$scope', function ($scope) {
	this.books = [
					{
						id: 0, 
						name: "James Bond", 
						edition: '1st',
						price: '$70',
						tags: ['asGoodAsNew'],
						ownersRating: 1, 
						numberOfReviews: 15
					},
					{
						id: 1, 
						name: "Code Geass",
						edition: '3st', 
						price: '$88', 
						tags: ['alright'],
						ownersRating: 3, 
						numberOfReviews: 10
					},
					{
						id: 2, 
						name: "NginX",
						edition: '2st', 
						price: '$200', 
						tags: ['myPrecious'],
						ownersRating: 5, 
						numberOfReviews: 100
					},
					]
	
	this.getStars = function(n){
		return new Array(n);
	}
	this.getEmptyStars = function(n){
		return new Array(5-n);
	}
	
}])