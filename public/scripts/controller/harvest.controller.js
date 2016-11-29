angular.module('growLogApp')
       .controller('HarvestController', HarvestController);

function HarvestController(seedsService) {
  var harvest = this;
  console.log('HarvestController loaded');

  harvest.plantedSeeds = seedsService;

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
