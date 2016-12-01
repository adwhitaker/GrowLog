angular.module('growLogApp')
    .controller('LocationController', LocationController);

function LocationController(locationService, $route) {
  var loc = this;

  loc.locationsFromService = locationService;

  // update location in DB
  loc.updateLocation = function (id, field, section, row) {
    data = { field: field, section: section, row: row };

    locationService.updateLocation(id, data)
    .then(function (response) {

    });
  };

  // delete location in DB
  loc.deleteLocation = function (id) {

    locationService.deleteLocation(id)
    .then(function (response) {

    });
  };
};
