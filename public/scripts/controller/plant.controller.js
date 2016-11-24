angular.module('growLogApp')
       .controller('PlantController', PlantController);

function PlantController($http, seedsService) {
  var plant = this;
  console.log('PlantController loaded');

  plant.usedSeeds = seedsService;

}
