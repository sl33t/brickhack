angular.module('starter.controllers', [])

// Login controller
.controller('LoginCtr', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.FBLogin = function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (authData) {
        console.log(authData);
		var face_data = [authData.user.uid, authData.user.displayName, authData.user.email];
		firebase.database().ref('users/' + face_data[0]).once('value').then(function(snapshot){
			if(snapshot.val() !== null){
				console.log('User exists');
			}
			else{
				console.log('User doesn\'t exist');
				firebase.database().ref('users/' + face_data[0]).set({'name' : face_data[1], 'email' : face_data[2],  'str' : 0, 'dex' : 0, 'con' : 0, 'int' : 0, 'wis' : 0, 'cha' : 0});
				firebase.database().ref('friends/').set(face_data[0]); 
				firebase.database().ref('friends/' + face_data[0]).set({'RickyID' : 'ricky', 'ArunID' : 'arun'});
			}
			$state.go('app.profile');
		});
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

.controller('ProfileCtr', function($scope) {
	var user = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + user).on('value', function(snapshot){
      var stat_html = '';
      var profile = snapshot.val();
      var statOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      for (var i = 0; i < statOrder.length; i++) {
          var statName = statOrder[i];
          if (statName != "con"){
            stat_html += statName.toUpperCase() +'<li>' + profile[statName] + '</li>';
          }
      }
      document.getElementById('stats').innerHTML = stat_html;
      var info = document.getElementsByClassName('info');
      info[0].innerHTML =  '<h3>' + profile.name + '</h3>';
    }, function (errorObject) {
      console.log(errorObject);
    });
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
.controller('FriendsCtr', function($scope) {
	var user = firebase.auth().currentUser.uid;
	firebase.database().ref('friends/' + user).on('value', function(snapshot){
		if(snapshot.val() != null){
			var friend_html = ''; 
			var f_list = snapshot.val(); 
			for(var friend_id in f_list){
				if(f_list.hasOwnProperty(friend_id)){
					//display
					friend_html += '<div class="friend"><h3>' + f_list[friend_id] + '</h3><span class="ion-ios-plus-outline"></span></div>';
				}
			}
			document.getElementById('container2').innerHTML = friend_html; 
		}
	}, function(errorObject) {
      console.log(errorObject);
    });
})
.controller('CommunityCtr', function($scope) {
	var user = firebase.auth().currentUser.uid;
	firebase.database().ref('friends/' + user).on('value', function(snapshot){
		if(snapshot.val() != null){
			var friend_html = ''; 
			var f_list = snapshot.val(); 
			for(var friend_id in f_list){
				if(f_list.hasOwnProperty(friend_id)){
					//display
					friend_html += '<div class="friend"><h3>' + f_list[friend_id] + '</h3><div class = "message"><p>some message</p></div></div>';
				}
			}
			document.getElementById('container').innerHTML = friend_html; 
		}
	}, function(errorObject) {
      console.log(errorObject);
    });
})
.controller('NotificationCtr', function($scope) {
	var user = firebase.auth().currentUser.uid;
})
.controller('ShareCheckCtr', function($scope) {})

.controller('AppCtrl', function($scope, $ionicPopup, $timeout, $ionicModal, $state) {
  $scope.logout = function() {
    firebase.auth().signOut().then(function () {
      // Sign-out is good!
    }, function (error) {
      console.log(error);
    });

    $state.go('login');
  }
})


.controller('DeclineNotificationCtr', function($scope) {})
.controller('ApproveNotificationCtr', function($scope) {});
