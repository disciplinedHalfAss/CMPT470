angular.module('mainApp')


.controller('BookIndexController', ['books', '$scope', function(books, $scope){
  $scope.state = 'add';
  $scope.books = books.books;
  $scope.active_book = {
    name: null,
    author: null,
    edition: null,
    isbn: null,
    price: null,
    tags: null,
    description: null,
  }
  $scope.addBook = function(book){
    if( (!book.isbn && (!book.name || !book.author || !book.edition) ) || !book.price ) { return; }
    books.create(book);
  }
  $scope.add = function(){
    $scope.addBook($scope.active_book);
    $scope.clear();
  }
  $scope.clear = function(){
    $scope.active_book = {
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
    angular.copy($scope.selected_book, $scope.active_book);
    $scope.state = 'edit';
  }
  
  $scope.cancel = function(){
    $scope.clear();
    $scope.state = 'add';
  }
  
  $scope.save = function(){
    books.save($scope.active_book, $scope.active_book.id)
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