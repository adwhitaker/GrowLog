angular.module('growLogApp')
       .controller('NewLocationFormController', NewLocationFormController);

function NewLocationFormController($http) {
  var locationForm = this;

  // add new location to the DB
  locationForm.addLocation = function (location) {

    let data = {
      field: location.field,
      section: location.section,
      row: location.row
    };

    $http.post('/location', data)
         .then(function () {
            locationForm.location = '';
          })
         .catch(function () {
            console.log('error posting request', error);
          });
  };

};
