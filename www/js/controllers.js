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
     facebookConnectPlugin.login(['email']).then( (response) => {
         const facebookCredential = firebase.auth.FacebookAuthProvider
             .credential(response.authResponse.accessToken);

         firebase.auth().signInWithCredential(facebookCredential)
         .then((success) => {
             console.log("Firebase success: " + JSON.stringify(success));
             this.userProfile = success;
         })
         .catch((error) => {
             console.log("Firebase failure: " + JSON.stringify(error));
         });

     }).catch((error) => { console.log(error) });
      $state.go('tab.profile');
}
  $scope.LoginContinue = function() {
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      $state.go('tab.profile');
    } else {
      alert("You are not logged in!");
    }
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

.controller('QuestCtr', function($scope) {
  $scope.cameraInit = function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log(navigator.device.capture);
    }
  }

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

.controller('FriendsCtr', function($scope) {});
