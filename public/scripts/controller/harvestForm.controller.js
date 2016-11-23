angular.module('growLogApp')
       .controller('HarvestFormController', HarvestFormController);

function HarvestFormController(seedsService) {
  console.log('HarvestFormController loaded');

  var harvestForm = this;

  harvestForm.usedSeeds = seedsService;

  harvestForm.submitHarvest = function (harvest) {
    console.log(harvest);
    // seeds in used id needed
    // location id needed
    // joins table id needed

    var newHarvest = {
      // seeds_id
      // transfer
      // quantity
      // plantedassigndate
      // plantdate
      // plantduration
      // projectedharvestdate
      actualharvestdate: moment(harvest.harvestDate).format('L'),
      amountharvested: harvest.amount,
      amountharvestedunits: harvest.units,
      harvestduration: harvest.duration
    };
    console.log('newHarvest', newHarvest);
  };
}
