angular.module('mainApp', ['ui.router', 'templates', 'Devise'])

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
        controller: 'StoreController',
        resolve: {
          bookPromise: ['reviewsFetch', function(reviewsFetch){
            return reviewsFetch.getAll();
          }],
        }
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
        },
        resolve: {
          bookPromise: ['books', function(books){
            return books.getAll();
          }]
        }
      })
      
        .state('login', {
        url: '/login',
        templateUrl: 'authentication/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
          }]
      })
      
        .state('register', {
        url: '/register',
        templateUrl: 'authentication/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home');
          })
          }]
      })

        .state('logout', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.logout().then(function (){
            $state.go('home');
          })
          }]
      })


       $urlRouterProvider.otherwise('home');
}])

