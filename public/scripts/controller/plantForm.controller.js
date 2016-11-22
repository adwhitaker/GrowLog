angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController() {
  var plantForm = this;
  console.log('PlantFormController loaded');
  plantForm.submitPlant = function(plant) {
    console.log(plant);
  };
}
