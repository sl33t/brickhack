// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // Setup landing login screen
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtr'
      })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtr'
        }
      }
    })
    .state('app.quest', {
      url: '/quest',
      views: {
        'menuContent': {
          templateUrl: 'templates/quest.html',
          controller: 'QuestCtr'
        }
      }
    })
    .state('app.friends', {
      url: '/friends',
      views: {
        'menuContent': {
          templateUrl: 'templates/friends.html',
          controller: 'FriendsCtr'
        }
      }
    })

      .state('app.community', {
        url: '/community',
        views: {
          'menuContent': {
            templateUrl: 'templates/community.html',
            controller: 'CommunityCtr'
          }
        }
      })

      .state('app.share_check', {
      url: '/share_check',
      views: {
        'menuContent': {
          templateUrl: 'templates/share_check.html',
          controller: 'ShareCheckCtr'
        }
      }
    });

  // Each tab has its own nav history stack:

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
