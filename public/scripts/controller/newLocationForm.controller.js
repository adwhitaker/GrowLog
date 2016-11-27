angular.module('growLogApp')
       .controller('NewLocationFormController', NewLocationFormController);

function NewLocationFormController($http) {
  var locationForm = this;
  console.log('NewLocationFormController loaded');

  locationForm.addLocation = function(location) {
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

  locationForm.getLocation = function() {
    $http.get('/location');
    // empty form after clicking 'submit'
    locationForm.location = '';
  }, function(error) {
    console.log('error posting request', error);
  };
//

}
