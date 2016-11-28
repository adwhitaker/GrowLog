angular.module('growLogApp')
    .service('locationService', locationService);

function locationService($http) {
    var location = this;

    location.getLocations = function() {
        return $http.get('/location').then(function(response) {
            return response.data;
        });
    };

    location.updateLocation = function(id, data) {
        return $http.put('/location/' + id, data).then(function(response) {
          location.getLocations();
            return response.data;
        });
    };

    location.deleteLocation = function(id) {
        return $http.delete('/location/' + id).then(function(response) {
          location.getLocations();
            return response.data;
        });
    };
}
