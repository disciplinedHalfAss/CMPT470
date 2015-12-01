angular.module('mainApp')


.controller('HomeCtrl', [function(){
}])




.factory('search',[ '$http', function($http){
  var o = {}
  o.universities = [];
  o.departments = [];
  o.courses = [];
  o.getAll = function(){
    o.getAllUniversities();
    o.getAllDepartments();
    o.getAllCourses();
  };
  o.getAllUniversities = function(){
    return $http.get('/universities.json').success(function(data){
      angular.copy(data, o.universities);
    });
  }
  o.getAllDepartments = function(){
    return $http.get('/departments.json').success(function(data){
      angular.copy(data, o.departments);
    });
  }
  o.getAllCourses = function(){
    return $http.get('/courses.json').success(function(data){
      angular.copy(data, o.courses);
    });
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
  o.create = function(book){
    return $http.post('/books.json', book).success(function(data){
      o.books.push(data);
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

