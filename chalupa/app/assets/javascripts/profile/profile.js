angular.module('mainApp')


.controller('BookIndexController', ['books', '$scope', 'Auth', function(books, $scope, Auth){
  $scope.state = 'add';
  $scope.active_book = {
    name: null,
    author: null,
    edition: null,
    isbn: null,
    price: null,
    tags: null,
    description: null,
    university_id: null,
    user_id: null,
  }
  Auth.currentUser().then(function (user){
    books.getAll({user_id: user.id});
    $scope.books = books.books;
    $scope.active_book.university_id = 1;
    $scope.active_book.user_id = user.id;
    
	});
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

.controller('UserInfoController', ['$scope', 'Auth',function($scope, Auth){
  Auth.currentUser().then(function (user){
  		$scope.logged_in_user = user;
	});
  
  $scope.state = 'saved'
  $scope.save = function(){
    
    Auth.UpdateResource
  }
  $scope.edit = function(){
    $scope.state = 'editing'
  }
  
}])