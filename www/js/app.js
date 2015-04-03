// Ionic pgt App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'pgt' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'pgt.controllers' is found in controllers.js
angular.module('pgt', ['ionic', 'pgt.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  
  .state('app.index', {
    url: "/index",
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html'
      }
    }
  })

  .state('app.propuestas', {
    url: "/propuestas",
    views: {
      'menuContent': {
        templateUrl: "templates/propuestas.html"
      }
    }
  })

  .state('app.noticias', {
    url: "/noticias",
    views: {
      'menuContent': {
        templateUrl: "templates/noticias.html",
        controller: 'NoticiasCtrl'
      }
    }
  })

  .state('app.bio', {
    url: "/bio",
    views: {
      'menuContent': {
        templateUrl: "templates/bio.html"
      }
    }
  })

  .state('app.trayectoria', {
    url: "/bio/trayectoria",
    views: {
      "menuContent": {
        templateUrl: "templates/trayectoria.html"
      }
    }
  })

  .state('app.agenda', {
    url: "/agenda",
    views: {
      'menuContent': {
        templateUrl: "templates/agenda.html",
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.mision', {
    url: "/bio/mision",
    views: {
      "menuContent": {
        templateUrl: "templates/bio/mision.html"
      }
    }
  })

  .state('app.vision', {
    url: "/bio/vision",
    views: {
      "menuContent": {
        templateUrl: "templates/bio/vision.html"
      }
    }
  })

  .state('app.objetivo', {
    url: "/bio/objetivo",
    views: {
      "menuContent": {
        templateUrl: "templates/bio/objetivo.html"
      }
    }
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');
});
