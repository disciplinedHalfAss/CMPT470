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
      
      .state('password', {
        url: '/password',
        templateUrl: 'partials/_change_password.html',
        controller: 'PasswordController'
      })
      
      .state('profile', {
        url: '/profile/{id}',
        views: {
          '': { templateUrl: 'partials/_profile.html' },
          'userinfo@profile': {
            templateUrl: 'partials/_userinfo.html',
            controller: 'UserInfoController'
          },
          'addview@profile': {
            templateUrl: 'partials/_new_book.html',
            controller: 'BookIndexController'
          }
        }
      })
      
        .state('login', {
        url: '/login',
        templateUrl: 'partials/_login.html',
        controller: 'LoginController'
      })
      
        .state('register', {
        url: '/register',
        templateUrl: 'partials/_register.html',
        controller: 'RegisterController'
      })

       $urlRouterProvider.otherwise('home');
}])

.controller('LoginController', [ 'users', '$scope', '$state', function(users, $scope, $state){
  $scope.id = ''
  $scope.password = ''
  $scope.signin = function(){
    console.log('1')
    var user_index = users.users.map(function(user){
      return user.email;
    }).indexOf($scope.id)
    if (user_index){
      if ($scope.password == users.users[user_index].password){
        users.logged_in_user = users.users[user_index];
        $state.go('profile');
      }
    }
  }
}])

.controller('RegisterController', [function(){
}])

.controller('PasswordController', ['users','$scope', function(users, $scope){
  $scope.logged_in_user = users.logged_in_user
  $scope.old_password = '';
  $scope.new_password = '';
  $scope.repeat_password = '';
  $scope.save = function(){
    if ($scope.old_password == $scope.logged_in_user.password){
      if ($scope.new_password == $scope.repeat_password){
        $scope.logged_in_user.password = $scope.new_password;
        
        $scope.old_password = '';
        $scope.new_password = '';
        $scope.repeat_password = '';
      }
    }
  }
}])

.controller('BookIndexController', ['books', '$scope', function(books, $scope){
  var id_g = 13;
  $scope.state = 'add';
  $scope.books = books.books;
  $scope.active_book = {
    id: null,
    name: null,
    author: null,
    edition: null,
    isbn: null,
    price: null,
    tags: null,
    description: null,
  }
  $scope.add = function(){
    $scope.active_book.id = ++id_g;
    $scope.books.push($scope.active_book);
    $scope.clear();
  }
  $scope.clear = function(){
    $scope.active_book = {
      id: null,
      name: null,
      author: null,
      edition: null,
      isbn: null,
      price: null,
      tags: null,
      description: null,
    }
  }
  
  $scope.show = function(id){
    $scope.index_of_book = $scope.books.map(
      function(e){
        return e.id
      }
    ).indexOf(id);
    $scope.selected_book = $scope.books[$scope.index_of_book];
    $scope.active_book = $.extend(true, {}, $scope.selected_book);
    $scope.state = 'edit';
  }
  $scope.cancel = function(){
    $scope.clear();
    $scope.state = 'add';
  }
  
  $scope.save = function(){
    console.log($scope.selected_book);
    $scope.books[$scope.index_of_book] = $.extend(true, {}, $scope.active_book);
    console.log($scope.selected_book);
    $scope.clear();
    $scope.state = 'add';
  }
  
  
}])

.controller('UserInfoController', ['$scope', 'users',function($scope, users){
  $scope.logged_in_user = users.logged_in_user;
  $scope.state = 'saved'
  $scope.save = function(){
    $scope.state = 'saved'
  }
  $scope.edit = function(){
    $scope.state = 'editing'
  }
  
}])

.controller('HomeCtrl', [function(){
}])
.controller('BookCtrl', [function(){ 
}])

.factory('users',[function(){
  var o = {
    users: [
      {
        username: 'Archit_the_pn_master',
        name: 'san',
        email: 'manga@pn.com',
        phone_number: 69696969,
        university: 'dead mountain',
        password: 123,
        facebook: 'atpm', 
      },
      {
        username: 'your magisty',
        name: 'ali',
        email: 'king@word.com',
        phone_number: 1000000000,
        university: 'MIT',
        password: 321,
        facebook: 'lord', 
      }
    ],
    logged_in_user: null,
  }
  return o;
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