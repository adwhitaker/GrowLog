angular.module('growLogApp')
       .controller('NewLocationFormController', NewLocationFormController);

function NewLocationFormController($http) {
  var locationForm = this;
  console.log('NewLocationFormController loaded');

  locationForm.addLocation = function(location) {
    console.log('location:', location);
    var field = location.field;
    var section = location.section;
    var row = location.row;
    var data = {field: field, section: section, row: row};
    $http.post('/location', data);

    // empty form after clicking 'submit'
    locationForm.location = '';
  }, function(error) {
    console.log('error posting request', error);
  };
}
