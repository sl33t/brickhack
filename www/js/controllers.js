angular.module('starter.controllers', [])

// Login controller
.controller('LoginCtr', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function($scope) {
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
      firebase.auth().signInWithPopup(provider).then(function (authData) {
        console.log(authData);
		var uid = authData.user.uid; 
		firebase.database().ref('users/' + uid).set({'name' : 'jerry'}); 
		var temp; 
		firebase.database().ref('users/' + uid).once('value').then(function(snapshot){
			temp = snapshot.key; 
			console.log('Parent' + snapshot.key); 
			if(uid == temp){
			console.log('success'); 
			}
			else{console.log('failure'); }
		}); 
		
        $state.go('tab.profile');
      }).catch(function(error) {
        console.log(error);
      });
  }
})

.controller('LogoutCtr', function($scope) {
  firebase.auth().signOut().then(function() {
    // Sign-out is good!
  }, function(error) {
    console.log(error);
  });

  // TODO: redirect back to login page
})

.controller('ProfileCtr', function($scope) {})
.controller('QuestCtr', function($scope) {})
.controller('FriendsCtr', function($scope) {});
