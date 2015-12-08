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
  o.sortOptions = [
    { name: 'Price: low to high', id: 0 },
    { name: 'Price: high to low', id: 1 },
    { name: 'Avg. user review', id: 2 },
    { name: 'Newest postings', id: 3 }
  ]
  return o;
}])

.factory('books', [ '$http', function($http){
  var o = {};
  o.books = [];
  o.getAll = function(options){
    return $http({ url: '/books.json', method: 'GET', params: options}).success(function(data){
      angular.copy(data, o.books);
    });
  };
  o.create = function(book){
    return $http.post('/books.json', book).success(function(data){
      o.books.push(data);
    });
  };
  o.save = function(book, id){
    return $http({ url: '/books/' + (id-1) , method: 'PUT', data: book }).success(function(data){
      console.log(data)
      o.books[o.books.map(function(e){ e.id }).indexOf(id)] = data;
    });
  };
  return o;
}])

.factory('selected', ['search', function(search){
  var o = {
    selectedUniversity: null,
    selectedDepartment: null,
    selectedCourse: null,
    
    predicate: 'created_at',
    reverse: false,
    order: null, 
  }
  return o;
}])

.controller('booksIndexCtrl', ['$scope', 'books', 'selected', '$filter', function ($scope, books, selected, $filter) {
	$scope.books = books.books;
  var orderBy = $filter('orderBy');
  selected.order = function(){
    $scope.books = orderBy($scope.books, selected.predicate, selected.reverse)
  }
	
	$scope.getStars = function(n){
    if (n) { return new Array(n); }
    return new Array(0)
	}
	$scope.getEmptyStars = function(n){
		if (n) { return new Array(5-n); }
    return new Array(5)
	}

}])

.controller('searchCtrl', ['$scope', 'search', 'selected', 'books', function ($scope, search, selected, books) {
  
  $scope.universities = search.universities
  $scope.departments = null;
  $scope.courses = null;
  $scope.sortOptions = search.sortOptions
	
	$scope.selectedUniversity = selected.selectedUniversity;
	$scope.selectedDepartment = selected.selectedDepartment;
	$scope.selectedCourse = selected.selectedDepartment;
  $scope.selectedSortOption = null;
	
	$scope.universityChanged = function(){
    $scope.departments = search.departments.filter(function(e){
      return e['university_id'] == $scope.selectedUniversity.id
    });
    $scope.selectedDepartment = null;
    $scope.selectedCourse = null;
    books.getAll({university_id: $scope.selectedUniversity.id})
	}
	$scope.departmentChanged = function(){
    $scope.courses = search.courses.filter(function(e){
      return e['department_id'] == $scope.selectedDepartment.id
    });
    $scope.selectedCourse = null;
    books.getAll({department_id: $scope.selectedDepartment.id})
	}
	$scope.courseChanged = function(){
    books.getAll({course_id: $scope.selectedCourse.id})
	}
  
	$scope.order = function(){
    switch ($scope.selectedSortOption.id){
      case 0:
        selected.predicate = 'price';
        selected.reverse = false;
        break
      case 1:
        selected.predicate = 'price';
        selected.reverse = true;
        break
      case 3:
        selected.predicate = 'created_at';
        selected.reverse = true;
        break
      default:
        selected.predicate = 'created_at';
        selected.reverse = true;
    }
    selected.order();
	}
}])

