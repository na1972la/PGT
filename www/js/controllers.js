angular.module('pgt.controllers', ['uiGmapgoogle-maps'])

.controller('MapCtrl', function($scope, $state, $stateParams) {
  $scope.map = {
    center: {
        latitude:  25.675769,
        longitude: -100.239579
      },
      zoom: 16,
      options: {
        scrollwheel: false,
        minZoom: 13,
        maxZoom: 18,
        streetViewControl: false,
        rotateControl: false,
        panControl: false,
        draggable: true,
        styles: [
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#eef6f6"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "color": "#c8f6c0"
                  },
                  {
                      "saturation": "-10"
                  },
                  {
                      "gamma": "1.00"
                  },
                  {
                      "weight": "0.01"
                  },
                  {
                      "lightness": "0"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": "84"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "saturation": "-6"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text",
              "stylers": [
                  {
                      "saturation": "42"
                  },
                  {
                      "lightness": "-90"
                  },
                  {
                      "weight": "0.01"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "gamma": "1.00"
                  },
                  {
                      "saturation": "54"
                  },
                  {
                      "lightness": "-100"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "weight": "0.01"
                  },
                  {
                      "gamma": "1.00"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#46bcec"
                  },
                  {
                      "visibility": "simplified"
                  }
              ]
          }
      ]
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
        color: '#29dd12',
        weight: 2,
        opacity: 1
    },
    fill: {
        color: '#ffffff',
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

.controller('NoticiasCtrl', function($scope, $http) {
  $scope.noticias = [
  {
    id: 1,
    titulo: "Noticia 1",
    sub: "Subtitulo 1",
    imagen: "1"
  },
  {
    id: 2,
    titulo: "Noticia 2",
    sub: "Subtitulo 2",
    imagen: "2"
  },
  {
    id: 3,
    titulo: "Noticia 3",
    sub: "Subtitulo 3",
    imagen: "3"
  },
  {
    id: 4,
    titulo: "Noticia 4",
    sub: "Subtitulo 4",
    imagen: "1"
  },
  ];

  $scope.actualizar = function() {
    var actual = $scope.noticias.length + 1;
    var noti = {
      id: actual,
      titulo: "Noticia " + actual,
      sub: "Subtítulo " + actual,
      imagen: "2"
    };
    $scope.noticias.push(noti);
    $scope.$broadcast('scroll.refreshComplete');
  }
});







