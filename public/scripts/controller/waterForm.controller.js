angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController() {
  var waterForm = this;
  console.log('WaterFormController loaded');

  waterForm.addActivity = function(activity) {
    var field = activity.field;
    var section = activity.section;
    var row = activity.row;
    var date = activity.date;
    var data = {field: field, section: section, row: row, date: date};
    waterForm.activity = '';
  };
}
