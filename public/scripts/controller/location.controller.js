angular.module('growLogApp')
    .controller('LocationController', LocationController);

function LocationController(locationService, $route) {
  var loc = this;

  loc.locationsFromService = locationService;

  loc.showDetails = function (id) {
    loc['details' + id] = !loc['details' + id];
    loc['edits' + id] = false;
  };

  loc.editDetails = function (id) {
    loc['edits' + id] = !loc['edits' + id];
    loc['details' + id] = false;
  };

  // update location in DB
  loc.updateLocation = function (locationObject) {
    loc.editDetails(locationObject.id);
    console.log(locationObject);
    if (locationObject.fieldUpdated === null) {
      return;
    } else {
      locationObject.field = locationObject.fieldUpdated;
    }

    if (locationObject.sectionUpdated === null) {
      return;
    } else {
      locationObject.section = locationObject.sectionUpdated;
    }

    if (locationObject.rowUpdated === null) {
      return;
    } else {
      locationObject.row = locationObject.rowUpdated;
    }

    var id = locationObject.id;
    var data = {
      field: locationObject.field,
      section: locationObject.section,
      row: locationObject.row,
    };

    console.log(data);
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
}
