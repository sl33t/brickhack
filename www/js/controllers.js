angular.module('starter.controllers', [])

// Login controller
.controller('LoginCtr', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.FBLogin = function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (authData) {
        console.log(authData);
		var face_data = [authData.user.uid, authData.user.displayName];
		firebase.database().ref('users/' + face_data[0]).once('value').then(function(snapshot){
			if(snapshot.val() !== null){
				console.log('User exists');
			}
			else{
				console.log('User doesn\'t exist');
				firebase.database().ref('users/' + face_data[0]).set({'name' : face_data[1], 'str' : 0, 'dex' : 0, 'con' : 0, 'int' : 0, 'wis' : 0, 'cha' : 0});
			}
		});
		/*firebase.database().ref('users/' + face_data[0]).set({'name' : face_data[1]});
		var temp;
		firebase.database().ref('users/' + face_data[0]).once('value').then(function(snapshot){
			temp = snapshot.key;
			console.log('Parent: ' + snapshot.key);
			if(face_data[0] == temp){
				console.log('success');
			}
			else{console.log('failure'); }
		}); **/
		//updates name to 'not jerry'
		//firebase.database().ref('users/' + uid).set({'name' : 'not jerry'});
        $state.go('app.profile');
      }).catch(function(error) {
        console.log(error);
      });
  }
})

.controller('LogoutCtr', function($scope) {

  $scope.logout = function() {
    firebase.auth().signOut().then(function() {
      // Sign-out is good!
    }, function(error) {
      console.log(error);
    });

    $state.go('login');
  }
})

.controller('ProfileCtr', function($scope) {

})
.controller('QuestCtr', function($scope) {})
.controller('FriendsCtr', function($scope) {})

.controller('AppCtrl', function($scope, $ionicPopup, $timeout, $ionicModal, $state) {
  $scope.logout = function() {
    firebase.auth().signOut().then(function () {
      // Sign-out is good!
    }, function (error) {
      console.log(error);
    });

    $state.go('login');
  }
});
