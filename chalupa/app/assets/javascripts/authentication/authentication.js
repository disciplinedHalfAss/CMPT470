angular.module('mainApp')

.controller('LoginController', [ 'users', '$scope', '$state', function(users, $scope, $state){
  $scope.id = ''
  $scope.password = ''
  $scope.signin = function(){
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



.controller('RegisterController', ['$scope', 'users', '$state', function($scope, users, $state){
  $scope.email_id = '';
  $scope.password = '';
  $scope.confirm_password = '';
  
  $scope.register = function(){
    var user_index = users.users.map(function(user){
      return user.email;
    }).indexOf($scope.email_id)
    if (user_index == -1){
      if ($scope.password == $scope.confirm_password){
        var new_user = {
          username: Math.random().toString(36).substring(7),
          name: null,
          email: $scope.email_id,
          phone_number: null,
          university: null,
          password: $scope.password,
          facebook: null, 
        }
        users.users.push(new_user);
        users.logged_in_user = users.users[users.users.map(function(e){
          return e.email;
        }).indexOf($scope.email_id)]
        console.log(new_user);
        console.log(users.logged_in_user);
        $state.go('profile');
      }
    }
  }
  
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
