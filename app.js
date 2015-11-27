angular.module('mainApp', ['ui.router'])

.config([

  '$stateProvider',
  '$urlRouterProvider',

  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'partials/_home.html',
        controller: 'HomeCtrl'
      })

      .state('book', {
        url: '/book/{id}',
        templateUrl: 'partials/_book.html',
        controller: 'StoreController'
      })

      .state('add_new_book', {
        url: '/new_book',
        templateUrl: 'partials/_new_book.html',
        controller: 'NewBookController'
      })

      .state('profile', {
        url: '/profile/{id}',
        templateUrl: 'partials/_profile.html',
        controller: 'ProfileController'
      })

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
// Books view
.controller('StoreController', ['$stateParams', 'books', function($stateParams, books) {
  this.product = books.books[$stateParams.id];
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








.controller("ProfileController", ["$scope", "$state", "books",
function($scope, $state, books) {

  $scope.data = books.books;

  $scope.addBook = function() {
    $state.go("add_new_book");
  };
  $scope.bookDetails = function(x) {
    $location.path("/bookDetails/" + x);
  };
  $scope.editbook = function(x) {
    $location.path("/home/" + x)
  }
  $scope.removeBook=function(index) {
    var r = confirm("Are you sure you want to delete this item?");
    if (r === true) {
      books.books.splice(index,1);
    } else {
    }
  }  
  // $scope.removeBook = function(index) {
  //   bookService.removeBook(index);
  //   $location.path("/home");
  // }
}])
.controller("NewBookController", ["$scope", "$state", "books",
function($scope, $state, books) {
  $scope.books = books.books
  
  $scope.save = function() {
    // bookService.addBooks({
    //   Author: $scope.book.author,
    //   Title: $scope.book.title,
    //   Keyword: $scope.book.keyword,
    //   ISBN: $scope.book.ISBN,
    //   Price: $scope.book.price,
    //   isDelete: false
    // })
    temp = {
        id: 1, 
        name: $scope.book.name,
        edition: $scope.book.edition,
        author: $scope.book.author,
        isbn:$scope.book.isbn, 
        price: $scope.book.price, 
        tags: [],
        ownersRating: null, 
        numberOfReviews: null
      }
   books.books.push(temp);
    $state.go("profile");
  }
  $scope.cancel = function() {
    $state.go("profile");
  }
}])

.controller("accountController", ["$scope", "$location", "$routeParams",
function($scope, $location, $routeParams) {

  $scope.signIn = function() {
    $location.path("/signIn");
  };

  $scope.home = function() {
    $location.path("/home");
  }
}])

.directive("clickToEdit", function() {
  var editorTemplate = '' +
    '<div class="click-to-edit">' +
    '<div ng-hide="view.editorEnabled">' +
    '{{value}} ' +
    '<a class="button tiny" ng-click="enableEditor()">Edit</a>' +
    '</div>' +
    '<div ng-show="view.editorEnabled">' +
    '<input type="text" class="small-12.columns" ng-model="view.editableValue">' +
    '<a class="button tiny" ng-click="save()">Save</a>' +
    ' or ' +
    '<a class="button tiny" ng-click="disableEditor()">cancel</a>' +
    '</div>' +
    '</div>';

  return {
    restrict: "A",
    replace: true,
    template: editorTemplate,
    scope: {
      value: "=clickToEdit",
    },
    link: function(scope, element, attrs) {
      scope.view = {
        editableValue: scope.value,
        editorEnabled: false
      };

      scope.enableEditor = function() {
        scope.view.editorEnabled = true;
        scope.view.editableValue = scope.value;
        setTimeout(function() {
          element.find('input')[0].focus();
          //element.find('input').focus().select(); // w/ jQuery
        });
      };

      scope.disableEditor = function() {
        scope.view.editorEnabled = false;
      };

      scope.save = function() {
        scope.value = scope.view.editableValue;
        scope.disableEditor();
      };

    }
  };
});