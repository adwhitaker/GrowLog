angular.module('growLogApp')
       .controller('HarvestController', HarvestController);

function HarvestController(seedsService) {
  var harvest = this;
  console.log('HarvestController loaded');

  harvest.plantedSeeds = seedsService;

  harvest.completeHarvest = function (harvestedPlant) {
    console.log('harvest', harvestedPlant);
  };
};
