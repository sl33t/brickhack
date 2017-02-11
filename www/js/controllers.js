angular.module('starter.controllers', [])

// Login controller
.controller('LoginCtr', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function() {
    // TODO Facebook login magic
    // This example just checks LoginService in service.js, provided a username and password.
    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
      $state.go('tab.dash');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
        });
      });
    }
  $scope.FBLogin = function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider);
  }
})

.controller('ProfileCtr', function($scope) {})
.controller('QuestCtr', function($scope) {})
.controller('FriendsCtr', function($scope) {});
