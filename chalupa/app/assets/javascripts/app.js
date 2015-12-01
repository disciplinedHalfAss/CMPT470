angular.module('mainApp', ['ui.router', 'templates'])

.config([

  '$stateProvider',
  '$urlRouterProvider',

  function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'HomeCtrl',
        resolve: {
          bookPromise: ['books', function(books){
            return books.getAll();
          }],
          searchPromise: ['search', function(search){
            return search.getAll();
          }]
        }
      })

      .state('book', {
        url: '/book/{id}',
        templateUrl: 'book/_book.html',
        controller: 'StoreController'
      })
      
      .state('password', {
        url: '/password',
        templateUrl: 'profile/_change_password.html',
        controller: 'PasswordController'
      })
      
      .state('profile', {
        url: '/profile/{id}',
        views: {
          '': { templateUrl: 'profile/_profile.html' },
          'userinfo@profile': {
            templateUrl: 'profile/_userinfo.html',
            controller: 'UserInfoController'
          },
          'addview@profile': {
            templateUrl: 'profile/_new_book.html',
            controller: 'BookIndexController'
          }
        }
      })
      
        .state('login', {
        url: '/login',
        templateUrl: 'authentication/_login.html',
        controller: 'LoginController'
      })
      
        .state('register', {
        url: '/register',
        templateUrl: 'authentication/_register.html',
        controller: 'RegisterController'
      })

       $urlRouterProvider.otherwise('home');
}])

.controller('navbarCtrl', ['$scope', function ($scope) {
	$scope.index;
	$scope.setIndex = function(i){
		$scope.index = i;
	}	
}])