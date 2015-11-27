var app = angular.module("bookApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider.when("/home", {
      templateUrl: "home.html",
      controller: "homeController"
    })
    .when("/home/add", {
      templateUrl: "add.html",
      controller: "addController"
    })
    .when("/signIn", {
      templateUrl: "signIn.html",
      controller: "accountController"
    })
    .when("/bookDetails", {
      templateUrl: "bookDetails.html",
      controller: "bookController"
    })
    .otherwise({
      redirectTo: "/home"
    })
});

app.factory("bookService", ["$rootScope", function($rootScope) {
  var svc = {};

  var data = [{
    id: 0,
    
    name: "My story with lecture recording",
    Keyword: 1,
    ISBN: 2,
    Price: 50,
    isDelete: false
  }, {
    id: 1,
    name: "100 ways to piss off your students",
    Keyword: 1,
    ISBN: 3,
    Price: 0,
    isDelete: false
  }, {
    id: 2,
    name: "Master Exam Making Techniques",
    Keyword: 1,
    ISBN: 4,
    Price: 50,
    isDelete: false
  }];

  svc.getBooks = function() {
    return data;
  };

  svc.addBooks = function(book) {
    data.push(book);
  };

  svc.editBooks = function(edit, book) {
    data[index] = book;
  };
  svc.removeBook=function(index) {
    var r = confirm("Are you sure you want to delete this item?");
    if (r === true) {
      data.splice(index,1);
    } else {
    }
  }  
  return svc;
}])
app.controller("homeController", ["$scope", "$location", "$routeParams", "bookService",
  function($scope, $location, $routeParams, bookService) {

    $scope.data = bookService.getBooks();

    $scope.addBook = function() {
      $location.path("/home/add");
    };
    $scope.bookDetails = function(x) {
      $location.path("/bookDetails/" + x);
    };
    $scope.editbook = function(x) {
      $location.path("/home/" + x)
    };
    $scope.removeBook = function(index) {
      bookService.removeBook(index);
      $location.path("/home");
    }
  }
]);
app.controller("addController", ["$scope", "$location", "$routeParams", "bookService",
  function($scope, $location, $routeParams, bookService) {
    $scope.save = function() {
      bookService.addBooks({
        Author: $scope.book.author,
        Title: $scope.book.title,
        Keyword: $scope.book.keyword,
        ISBN: $scope.book.ISBN,
        Price: $scope.book.price,
        isDelete: false
      })
      $location.go("/profile");
    }
    $scope.cancel = function() {
      $location.path("/home");
    }
  }
]);
app.controller("accountController", ["$scope", "$location", "$routeParams", "bookService",
  function($scope, $location, $routeParams, bookService) {

    $scope.signIn = function() {
      $location.path("/signIn");
    };

    $scope.home = function() {
      $location.path("/home");
    }
  }
]);
app.controller("bookController", ["$scope", "$location", "$routeParams", "bookService",
  function($scope, $location, $routeParams, bookService) {
    $scope.data = bookService.getBooks();
  }
]);
app.directive("clickToEdit", function() {
  var editorTemplate = '' +
    '<div class="click-to-edit">' +
    '<div ng-hide="view.editorEnabled">' +
    '{{value}} ' +
    '<a class="button tiny" ng-click="enableEditor()">Edit</a>' +
    '</div>' +
    '<div ng-show="view.editorEnabled">' +
    '<input type="text" class="small-12.columns" ng-model="view.editableValue">' +
    '<a class="button tiny" href="#home" ng-click="save()">Save</a>' +
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