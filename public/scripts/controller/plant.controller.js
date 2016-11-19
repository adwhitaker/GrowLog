angular.module('growLogApp')
       .controller('PlantController', PlantController);

function PlantController() {
  var plant = this;
  console.log('PlantController loaded');
}
