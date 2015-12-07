angular.module('mainApp')

.factory('reviewsFetch',[ '$http', function($http){
  var o = {}
  o.reviews = [];
  o.getAll = function(){
    o.getAllReviews();
  };
  o.getAllReviews = function(){
    return $http.get('/reviews.json').success(function(data){
      angular.copy(data, o.reviews);
      o.call_back_function();
    });
  }
  o.call_back_function = function(){};
  return o;
}])

.controller('revCtrl', ['$scope', 'reviewsFetch', function ($scope, reviewsFetch) {
  reviewsFetch.call_back_function = function(){
    $scope.reviews = reviewsFetch.reviews;
  }
}])


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
