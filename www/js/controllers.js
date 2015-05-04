angular.module('pgt.controllers', ['uiGmapgoogle-maps'])

.factory('Noticias', function($http, $ionicPopup){
  return {
    getAll: function() {
      $http.get("http://104.236.249.81/jason.php?action=all")

        // Si funciona la llamada...
        .success(function(data) {
          console.log(data);
          window.localStorage['noticias'] = angular.toJson(data);
        })

        // ...Y si no...
        .error(function(data) {
          var alerta = $ionicPopup.alert({
            title: "Error de conexión",
            templateUrl: "templates/popups/error_internet.html"
          });
        })
    },
    getOne: function(id) {
      var noticia = angular.fromJson(window.localStorage['noticias']);

      return noticia[id];
    },
    getLast: function() {
      $http.get("http://104.236.249.81/jason.php?action=getLast")

        // Si funciona la llamada...
        .success(function(data) {
          console.log(data);
          window.localStorage['lastUpdate'] = data.last;
          window.localStorage['lastNoticia'] = data.ID
          return data.last;
        })

        // ...Y si no...
        .error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error de conexión',
            templateUrl: "templates/popups/error_internet.html"
          });
          return false;
      });
    }
  }
})

.factory('Agenda', ['$http', '$ionicPopup', function($http, $ionicPopup){
  return {
    getAgenda: function() {
      $http.get("http://104.236.249.81/jason.php?action=agenda")

        .success(function(data) {
          window.localStorage['agenda'] = angular.toJson(data);
          // return window.localStorage['agenda'];
        })
        .error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error de conexión',
            templateUrl: "templates/popups/error_internet.html"
          });
        });
    }
  }
}])

.controller('MapCtrl', function($scope, $stateParams) {
  $scope.map = {
    center: {
        latitude:  25.675769,
        longitude: -100.239579
      },
      zoom: 17,
      options: {
        scrollwheel: false,
        minZoom: 13,
        maxZoom: 18,
        streetViewControl: false,
        rotateControl: false,
        panControl: false,
        draggable: true
      },
      control: {}
  };

  $scope.circle = {
    center: {
      latitude: $stateParams.lat,
      longitude: $stateParams.lng
    },
    radius: 50,
    stroke: {
        // color: '#29dd12',
        color: '#cd5d1e',
        weight: 2,
        opacity: 1
    },
    fill: {
        // color: '#ffffff',
        color: '#cd5d1e',
        opacity: 0.15
    },
    draggable: false,
    editable: false
  };

  console.log("Param: " + $stateParams.lat + ", " + $stateParams.lng);
  $scope.map.center.latitude = $stateParams.lat;
  $scope.map.center.longitude = $stateParams.lng;

})

.controller('AgendaCtrl', function($scope, Agenda) {

  $scope.lugares = angular.fromJson(window.localStorage['agenda']);
  
  $scope.actualizar = function() {
    Agenda.getAgenda();
    $scope.lugares = angular.fromJson(window.localStorage['agenda']);
    $scope.$broadcast('scroll.refreshComplete');
  }

})

.controller('AppCtrl', function($scope, $timeout, $ionicPopup, Noticias) {

  $scope.showAbout = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Acerca de',
     templateUrl: "templates/popups/acerca_de.html"
   });
  }

  // Open the login modal
  $scope.about = function() {
    $scope.modal.show();
  };
})


.controller('NoticiasCtrl', function($scope, $http, Noticias) {

  /**
   * Variables de actualización:
   *
   *  lastUpdate_local = Ultima actualización local; la última vez que la App pidió actualizarse.
   *
   *  lastUpdate = Última vez que el servidor se actualizó.
   * 
   */

  $scope.noticias = angular.fromJson(window.localStorage['noticias']);
  $scope.lastUpdate = window.localStorage['lastUpdate'];

  $scope.actualizar = function() {

    // Set last Updated
    $scope.lastUpdate_local = new Date();
    window.localStorage['lastUpdate_local'] = $scope.lastUpdate_local;

    // Get the news
    Noticias.getAll();

    // Update local $scope
    $scope.noticias = angular.fromJson(window.localStorage['noticias']);

    // End 
    $scope.$broadcast('scroll.refreshComplete');
  }
})

.controller('NotiCtrl', function($scope, Noticias, $stateParams) {
  
  $scope.recibido = $stateParams.id;

  $scope.noticia = Noticias.getOne($scope.recibido);

  $scope.noticia.date = $scope.noticia.date.substr(0,10);

});







