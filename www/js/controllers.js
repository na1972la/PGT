angular.module('pgt.controllers', ['uiGmapgoogle-maps'])

.factory('Noticias', ['$http', '$ionicPopup', function($http, $ionicPopup){
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
    }, //  getLast()
    getNews: function() {
      var last = window.localStorage['lastUpdate'];
      last = last.replace(/ /g, '_');

      $http.get("http://104.236.249.81/jason.php?action=get&lastUpdate="+last)

        // Si funciona la llamada...
        .success(function(data) {

        })

        // ...Y si no...
        .error(function(data) {

        });

    }
  }
}])

.controller('MapCtrl', function($scope, $state, $stateParams) {
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

  console.log("Param: " + $stateParams.lat);
  console.log("Param: " + $stateParams.lng);
  $scope.map.center.latitude = $stateParams.lat;
  $scope.map.center.longitude = $stateParams.lng;

})

.controller('AgendaCtrl', function($scope) {
  $scope.lugares = [
  {
    idea: 1,
    direccion: "La Pastora",
    latitude:  25.668212, 
    longitude: -100.248840
  },
  { 
    idea: 2,
    direccion: "Hosp. Materno Infantil",
    latitude:  25.694096, 
    longitude: -100.222575
  },
  { 
    idea: 3,
    direccion: "Facultad de Artes Visuales",
    latitude:  25.614009, 
    longitude: -100.277443
  },
  {
    idea: 4,
    direccion: "Oficina del PAN",
    latitude: 25.675775,
    longitude: -100.224663
  },
  {
    idea: 5,
    direccion: "Barrio Antiguo",
    latitude: 25.665689,
    longitude:  -100.308431
  }
  ];
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







