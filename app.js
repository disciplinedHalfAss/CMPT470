angular.module('mainApp', ['ui.router'])

.config([

  '$stateProvider',
  '$urlRouterProvider',

  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'HomeCtrl'
      })

      .state('book', {
        url: '/book/{id}',
        templateUrl: 'book.html',
        controller: 'StoreController'
      });

       $urlRouterProvider.otherwise('home');
  }

  ])


.controller('HomeCtrl', [function(){

}])

.controller('BookCtrl', [function(){
  
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
.factory('books', [function(){
  var o = {
    books: 
    [
      {
        id: 0, 
        name: "James Bond", 
        edition: 1,
        author:"Alireza",
        isbn:21367,
        price: '70',
        tags: ['asGoodAsNew'],
        ownersRating: 1, 
        numberOfReviews: 15
      },
      {
        id: 1, 
        name: "Code Geass",
        edition: 3,
        author:"",
        isbn:21367, 
        price: '88', 
        tags: ['alright'],
        ownersRating: 3, 
        numberOfReviews: 10
      },
      {
        id: 2, 
        name: "NginX",
        edition: 2,
        author:"",
        isbn:21367, 
        price: '200', 
        tags: ['myPrecious'],
        ownersRating: 5, 
        numberOfReviews: 100
      },
    ]
  }
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




//From Book Module--------------------------------------------


.controller('StoreController', ['$stateParams', 'books', function(books, $stateParams) {
  this.pooh = $stateParams.id;
  this.product = books.books[0];
}])

.controller("TabController", [function() {
  this.tab = 1;

  this.isSet = function(checkTab) {
    return this.tab === checkTab;
  };

  this.setTab = function(setTab) {
    this.tab = setTab;
  };
}])

.controller('GalleryController', [function(){
  this.current = 0;

  this.setCurrent = function(imageNumber){
    this.current = imageNumber || 0;
  };
}])

.controller("ReviewController", [function(){

  this.review = {};

  this.addReview = function(product){
    product.reviews.push(this.review);
    this.review = {};
  };
}])

// var books = {
//     name: 'Pinciples of Mathematical Analysis',
//     description: "Hi, I am description",
//     author: "Walter Rudin",
//     isbn: 987654321099,
//     price: 110.50,
//     edition: 2,
//     images: [
//       "http://d.gr-assets.com/books/1339192336l/292079.jpg",
//       "http://ecx.images-amazon.com/images/I/41QkrgV1BhL._SY344_BO1,204,203,200_.jpg",
//       "http://ecx.images-amazon.com/images/I/31w4IxdgYbL._SY344_BO1,204,203,200_.jpg"
//     ]
//   };

