console.log("hello!")

angular
  .module('anguweathar', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
      controller : 'RootCtrl',
      templateUrl : 'partials/root.html'
    })
    .when('/weather/:zipcode', {
      controller: 'WeatherCtrl',
      templateUrl : '/partials/weather.html'
    })
  })
  .controller('RootCtrl', function($scope, $location) {
    console.log("I'm a root controller")
    $scope.gotoWeather = () => {
      //change the url
      $location.url(`/weather/${$scope.zip}`);
    }
  })
  .controller('WeatherCtrl', function($scope, $routeParams, weatherFactory) {
    weatherFactory
      .getWeather($routeParams.zipcode)
      .then((weather) => {
        $scope.temperature = weather.temp,
        $scope.city = weather.city
      })


     })

    .factory('weatherFactory', ($http) => {
      return {
        getWeather (zipcode) {
          return $http
          .get(`http://api.wunderground.com/api/01e00dbf4c45c515/conditions/q/${zipcode}.json`)
            .then((response)=> {
              return  {
                temp : response.data.current_observation.temp_f,
                  city : response.data.current_observation.display_location.full
              }

        })
      }
    }

  })
