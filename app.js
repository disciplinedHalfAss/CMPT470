angular.module('mainApp', [])
.controller('navbarCtrl', ['$scope', function ($scope) {
	$scope.index;
	$scope.setIndex = function(i){
		$scope.index = i;
	}	
}])
.factory('search',[function(){
  var o = {
    	universities: [
                      { name: 'SFU', id: 0 },
                      { name: 'UBC', id: 1 }
                    ],
      departments:  [
                      { name: 'MATH', id: 0 },
                      { name: 'ECON', id: 1 },
                      { name: 'PHYS', id: 2 }
                    ],				
      courses:  [
                  { name: '238', id: 0 },
                  { name: '300', id: 1 },
                  { name: '338', id: 2 }
                ],	
      sortOptions:  [
                      { name: 'Price: low to high', id: 0 },
                      { name: 'Price: high to low', id: 1 },
                      { name: 'Avg. user review', id: 2 },
                      { name: 'Newest postings', id: 3 }
                    ]
  }
  return o;
}])
.factory('books', [function(){
  var o = {
    books: 
    [
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
        edition: '3rd', 
        price: '$88', 
        tags: ['alright'],
        ownersRating: 3, 
        numberOfReviews: 10
      },
      {
        id: 2, 
        name: "NginX",
        edition: '2nd', 
        price: '$200', 
        tags: ['myPrecious'],
        ownersRating: 5, 
        numberOfReviews: 100
      },
    ]
  }
  return o;
}])

.controller('searchCtrl', ['$scope', 'search', function ($scope, search) {
  
  $scope.universities = search.universities
  $scope.departments = search.departments
  $scope.courses = search.courses
  $scope.sortOptions = search.sortOptions
	
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
.controller('booksIndexCtrl', ['$scope', 'books', function ($scope, books) {
	$scope.books = books.books
	
	$scope.getStars = function(n){
		return new Array(n);
	}
	$scope.getEmptyStars = function(n){
		return new Array(5-n);
	}
	
}])