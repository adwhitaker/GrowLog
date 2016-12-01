angular.module('growLogApp')
    .service('locationService', locationService);

function locationService($http) {
  var location = this;

  // where all the locations returned from the DB are stored
  var locations = {
    allLocations: []
  };

  location.locations = locations;

  // get all locations from the DB
  location.getLocations = function () {
    return $http.get('/location').then(function (response) {
      locations.allLocations = response.data;
      return;
    });
  };

  // update a location in the DB
  location.updateLocation = function (id, data) {
      return $http.put('/location/' + id, data)
      .then(function (response) {
          location.getLocations();
          return;
        });
    };

  // delete a location in the DB
  location.deleteLocation = function (id) {
      return $http.delete('/location/' + id)
      .then(function (response) {
          location.getLocations();
          return;
        });
    };

  // initial get all locations;
  location.getLocations();
}
