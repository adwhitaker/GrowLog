angular.module('growLogApp')
       .controller('HarvestFormController', HarvestFormController);

function HarvestFormController(seedsService, activityService) {
  console.log('HarvestFormController loaded');

  var harvestForm = this;

  harvestForm.usedSeeds = seedsService;

  harvestForm.activity = activityService;

  harvestForm.submitHarvest = function (choice, harvest) {

    var newHarvest = {
      seeds_id: choice.seeds_id,
      transfer: choice.transfer,
      quantity: choice.quantity,
      plantedassigndate: moment(harvest.plantedassigndate).format('L'),
      plantdate: moment(harvest.plantdate).format('L'),
      plantduration: choice.plantduration,
      projectedharvestdate: moment(harvest.projectedharvestdate).format('L'),
      actualharvestdate: moment(harvest.actualharvestdate).format('L'),
      amountharvested: harvest.amount,
      amountharvestedunits: harvest.units,
      joins_id: choice.id,
      location_id: choice.location_id,
      seedsinuse_id: choice.seedsinuse_id,

    };

    seedsService.updateUsedSeed(newHarvest);

  };
}
