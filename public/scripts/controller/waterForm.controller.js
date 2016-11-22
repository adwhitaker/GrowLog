angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController(locationService) {
  var waterForm = this;

  locationService.getLocations().then(function (response) {
    waterForm.locations = response;
    console.log(response);
  });

  waterForm.addActivity = function (activity) {
    var field = activity.field;
    var section = activity.section;
    var row = activity.row;
    var date = activity.date;
    var data = {field: field, section: section, row: row, date: date};
    waterForm.activity = '';
  };
}
