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
        $state.go('app.profile', {user : face_data[0]});
      }).catch(function(error) {
        console.log(error);
      });

    // This FB authentication code works in an Android envrionment.
    // TODO see if it conflicts with the above code.
    //
    // facebookConnectPlugin.getLoginStatus( function (success) {
    //   if (success.status == 'connected') {
    //      $state.go('tab.profile');
    //   }
    //   else {
    //   facebookConnectPlugin.login(['email']).then( (response) => {
    //       const facebookCredential = firebase.auth.FacebookAuthProvider
    //           .credential(response.authResponse.accessToken);

    //       firebase.auth().signInWithCredential(facebookCredential)
    //       .then((success) => {
    //           console.log("Firebase success: " + JSON.stringify(success));
    //           this.userProfile = success;
    //       })
    //       .catch((error) => {
    //           console.log("Firebase failure: " + JSON.stringify(error));
    //       });

    //   }).catch((error) => { console.log(error) });
    //   }
    // }, function (error) {
    //   console.error("Facebook probs");
    // }

    // );
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
	var uid = $state.params.user;
	console.log('Stuff: ' + uid); 
})
.controller('QuestCtr', function($scope) {

  // capture callback
  $scope.startVideo = function () {
    var captureSuccess = function(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // TODO send file to other person
      }
    };
    // capture error callback
    var captureError = function(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };

    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
  }
})
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
