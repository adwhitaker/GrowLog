angular.module('growLogApp')
       .service('locationService', locationService);

function locationService($http) {
  var location = this;

  location.getLocations = function () {
    return $http.get('/location').then(function (response) {
      return response.data;
    });
  };

  location.updateLocation = function (data) {
    console.log('data', data);
    return $http.put('/location', data).then(function (response) {
      return response.data;
    });
  };

  location.deleteLocation = function (id) {
    console.log('id', id);
    return $http.delete('/location/' + id).then(function (response) {
      return response.data;
    });
  };
}
