angular.module('pgt.controllers', ['uiGmapgoogle-maps'])

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

.controller('AppCtrl', function($scope, $timeout, $ionicPopup) {

  $scope.showAbout = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Acerca de',
     templateUrl: "templates/acerca_de.html"
   });
  }

  // Open the login modal
  $scope.about = function() {
    $scope.modal.show();
  };
})

.factory('Noticias', ['$http', '$ionicPopup', function($http, $ionicPopup){
  return {
    getLast: function() {
      $http.get("http://104.236.249.81/jason.php?action=getLast")
        .success(function(data) {
          console.log(data);
          window.localStorage['lastUpdate'] = data.last;
          return data.last;
        })
        .error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Error de conexión',
            templateUrl: "templates/error_internet.html"
          });
          return false;
        });
    }
  }
}])

.controller('NoticiasCtrl', function($scope, $http, Noticias) {
  $scope.noticias = [
  {
    id: 1,
    titulo: "Noticia 1",
    sub: "Subtitulo 1",
    imagen: "1"
  }
  ];

  $scope.lastUpdate = window.localStorage['lastUpdate'];

  $scope.derp = "nop";

  $scope.actualizar = function() {
    $scope.derp = "yup";
    $scope.lastUpdate = Noticias.getLast();
    $scope.$broadcast('scroll.refreshComplete');
  }
});






