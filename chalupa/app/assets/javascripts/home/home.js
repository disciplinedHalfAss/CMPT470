angular.module('mainApp')


.controller('HomeCtrl', [function(){
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
  }
  return o;
}])




.factory('books', [ '$http', function($http){
  var o = {};
  o.books = [];
  o.getAll = function(){
    return $http.get('/books.json').success(function(data){
      angular.copy(data, o.books);
    });
  };
  return o;
}])


.factory('selected', [function(){
  var o = {
    selectedUniversity: null,
    selectedDepartment: null,
    selectedCourse: null,
    selectedSortOption: null,

    sortOptions:  [
                      { name: 'Price: low to high', id: 0 },
                      { name: 'Price: high to low', id: 1 },
                      { name: 'Avg. user review', id: 2 },
                      { name: 'Newest postings', id: 3 }
                    ]
    
  }
  return o;
}])
.controller('navbarCtrl', ['$scope', function ($scope) {
	$scope.index;
	$scope.setIndex = function(i){
		$scope.index = i;
	}	
}])


.controller('booksIndexCtrl', ['$scope', 'books', 'selected', function ($scope, books, selected) {
	$scope.books = books.books;
  $scope.books_order_by = function(book){
    console.log(selected.selectedSortOption)
    switch (selected.selectedSortOption){
      case 0:
        return book.price;
        break;
      case 1:
        return -book.price;
        break;
      case 2:
        return book.ownersRating;
        break;
      case 3:
        break;
      default:
        return book.numberOfReviews;
    } 
  }
	
	$scope.getStars = function(n){
		return new Array(n);
	}
	$scope.getEmptyStars = function(n){
		return new Array(5-n);
	}
	
}])



.controller('searchCtrl', ['$scope', 'search', 'selected', function ($scope, search, selected) {
  
  $scope.universities = search.universities
  $scope.departments = search.departments
  $scope.courses = search.courses
  
  $scope.sortOptions = selected.sortOptions
	
	$scope.selectedUniversity = selected.selectedUniversity;
	$scope.selectedDepartment = selected.selectedDepartment;
	$scope.selectedCourse = selected.selectedCourse;
	$scope.selectedSortOption = selected.selectedSortOption;
	
	$scope.universityChanged = function(){

	}
	$scope.departmentChanged = function(){
		
	}
	$scope.courseChanged = function(){
		
	}
	$scope.sortOrder = function(){
		
	}
}])

