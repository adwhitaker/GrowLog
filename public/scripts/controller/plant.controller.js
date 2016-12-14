angular.module('growLogApp')
       .controller('PlantController', PlantController);

function PlantController(seedsService) {
  var plant = this;

  plant.usedSeeds = seedsService;

  plant.showDetails = function (id) {
    plant['details' + id] = !plant['details' + id];
    plant['edits' + id] = false;
    plant['complete' + id] = false;
  };

  plant.editDetails = function (id) {
    plant['edits' + id] = !plant['edits' + id];
    plant['details' + id] = false;
    plant['complete' + id] = false;
  };

  plant.markComplete = function (id) {
    plant['complete' + id] = !plant['complete' + id];
    plant['edits' + id] = false;
    plant['details' + id] = false;
  };

  plant.completePlant = function (id, plantObject) {
    var id = id;

    var completedPlant = {
      seeds_id: plantObject.seeds_id,
      transfer: plantObject.transfer,
      usedquantity: plantObject.usedquantity,
      plantedassigndate: plantObject.plantedassigndate,
      plantdate: moment().format('L'),
      plantduration: plantObject.plantduration,
      projectedharvestdate: plantObject.projectedharvestdate,
      actualharvestdate: plantObject.actualharvestdate,
      amountharvested: plantObject.amount,
      amountharvestedunits: plantObject.units,
      joins_id: plantObject.id,
      location_id: plantObject.location_id,
      seedsinuse_id: plantObject.seedsinuse_id,
    };

    seedsService.updateUsedSeed(completedPlant);
  };

  plant.updatePlant = function(id, plantObject) {
    plant.showDetails(id);

    var updatedPlant = {
      seeds_id: plantObject.seeds_id,
      transfer: plantObject.transfer,
      usedquantity:  plantObject.usedquantity,
      plantedassigndate: moment(plantObject.newAssignDate).format('L'),
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

    seedsService.updateUsedSeed(updatedPlant);
  };

  plant.deletePlant = function (id, plantObject) {

    var deletedPlantTask = {
      join_id: plantObject.id,
      location_id: plantObject.location_id,
      seedsinuse_id: plantObject.seedsinuse_id
    };

    seedsService.deleteUsedSeed(deletedPlantTask);
  };
}
