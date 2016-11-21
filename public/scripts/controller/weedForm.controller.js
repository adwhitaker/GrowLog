angular.module('growLogApp')
       .controller('WeedFormController', WeedFormController);

function WeedFormController() {
  var weedForm = this;
  console.log('WeedFormController loaded');

  weedForm.addWeedingActivity = function(field, section, row, assign)  {
    var data = {field: field, section: section, row: row, assign: assign};
    console.log('data', data);

  };
}
