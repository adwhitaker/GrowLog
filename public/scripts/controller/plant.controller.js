angular.module('growLogApp')
       .controller('PlantController', PlantController);

function PlantController(seedsService) {
  var plant = this;
  console.log('PlantController loaded');

  plant.usedSeeds = seedsService;

  plant.completePlant = function(id, plantObject) {
    var id = id;
    var completeDate = moment().format('L');

    var completedPlant = {
      seeds_id: plantObject.seeds_id,
      transfer: plantObject.transfer,
      usedquantity: plantObject.usedquantity,
      plantedassigndate: plantObject.plantedassigndate,
      plantdate: completeDate,
      plantduration: plantObject.plantduration,
      projectedharvestdate: plantObject.projectedharvestdate,
      actualharvestdate: plantObject.actualharvestdate,
      amountharvested: plantObject.amount,
      amountharvestedunits: plantObject.units,
      joins_id: plantObject.id,
      location_id: plantObject.location_id,
      seedsinuse_id: plantObject.seedsinuse_id,
    };
    seedsService.updateUsedSeed(completedPlant).then(function () {
      seedsService.getUsedSeed();
    });
  };

  plant.updatePlant = function(id, plantObject) {
    var newDate = moment(plantObject.newAssignDate).format('L');
    var updatedPlant = {
      seeds_id: plantObject.seeds_id,
      transfer: plantObject.transfer,
      usedquantity:  plantObject.updatedQuantity,
      plantedassigndate: newDate,
      plantdate: plantObject.plantdate,
      plantduration: plantObject.plantduration,
      projectedharvestdate: plantObject.projectedharvestdate,
      actualharvestdate: plantObject.actualharvestdate,
      amountharvested: plantObject.amount,
      amountharvestedunits: plantObject.units,
      joins_id: plantObject.id,
      location_id: plantObject.location_id,
      seedsinuse_id: plantObject.seedsinuse_id,
    };
    console.log('updatedPlant:', updatedPlant);
    seedsService.updateUsedSeed(updatedPlant);
  };
}
