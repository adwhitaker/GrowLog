angular.module('growLogApp')
       .controller('HarvestController', HarvestController);

function HarvestController(seedsService) {
  var harvest = this;
  console.log('HarvestController loaded');

  harvest.plantedSeeds = seedsService;

  harvest.editedPlant = function (plant) {
    harvest.editPlantInProgress = Object.assign({}, plant);
  };

  harvest.editPlant = function (plant) {
    var updatedPlant = {
      seeds_id: plant.seeds_id,
      transfer: plant.transfer,
      usedquantity: plant.usedquantity,
      plantedassigndate: plant.plantedassigndate,
      plantdate: plant.plantdate,
      plantduration: plant.plantduration,
      projectedharvestdate: plant.projectedharvestdate,
      actualharvestdate: plant.actualharvestdate,
      amountharvested: plant.amountharvested,
      amountharvestedunits: plant.amountharvestedunits,
      joins_id: plant.id,
      location_id: plant.location_id,
      seedsinuse_id: plant.seedsinuse_id,
    };

    seedsService.updateUsedSeed(updatedPlant);
  };

  harvest.completeHarvest = function (harvestedPlant) {

    var newHarvestedPlant = {
      seeds_id: harvestedPlant.seeds_id,
      transfer: harvestedPlant.transfer,
      usedquantity: harvestedPlant.usedquantity,
      plantedassigndate: harvestedPlant.plantedassigndate,
      plantdate: harvestedPlant.plantdate,
      plantduration: harvestedPlant.plantduration,
      projectedharvestdate: harvestedPlant.projectedharvestdate,
      actualharvestdate: harvestedPlant.actualharvestdate,
      amountharvested: harvestedPlant.amountharvested,
      amountharvestedunits: harvestedPlant.amountharvestedunits,
      joins_id: harvestedPlant.id,
      location_id: harvestedPlant.location_id,
      seedsinuse_id: harvestedPlant.seedsinuse_id,
    };

    seedsService.updateUsedSeed(newHarvestedPlant);
  };
};
