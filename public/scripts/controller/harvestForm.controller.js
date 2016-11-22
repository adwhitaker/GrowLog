angular.module('growLogApp')
       .controller('HarvestFormController', HarvestFormController);

function HarvestFormController() {
  var harvestForm = this;
  console.log('HarvestFormController loaded');
  harvestForm.submitHarvest = function(harvest) {
    console.log(harvest);
  };
}
