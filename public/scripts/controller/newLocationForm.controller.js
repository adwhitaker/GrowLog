angular.module('growLogApp')
       .controller('NewLocationFormController', NewLocationFormController);

function NewLocationFormController($http, locationService) {
  var locationForm = this;

  // add new location to the DB
  locationForm.addLocation = function (location) {

    let data = {
      field: location.field,
      section: location.section,
      row: location.row
    };

    locationService.addLocation(data)
                   .then(function () {
                      locationForm.location = '';
                    })
                   .catch(function () {
                      console.log('error posting request', error);
                    });
  };
};
