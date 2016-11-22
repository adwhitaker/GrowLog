angular.module('growLogApp')
       .service('locationService', locationService);

function locationService($http) {
  var location = this;

  location.getLocations = function () {
    return $http.get('/location').then(function (response) {
      return response.data;
    });
  };
}
