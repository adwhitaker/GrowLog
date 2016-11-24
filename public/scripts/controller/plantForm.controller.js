angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController($http, locationService, seedsService) {
  var plantForm = this;
  console.log('PlantFormController loaded');

  locationService.getLocations().then(function(response) {
    plantForm.locations = response;
  });

  plantForm.usedSeeds = seedsService;

  plantForm.submitPlant = function(plant) {
    var seedsId = plant.choice.seeds_id;
    var plantedassigndate = moment(plant.assignDate).format('L');
    var choice = plant.choice;
    var projectedharvestdate = moment(plant.harvestDate).format('L');
    var quantity = plant.quantity;
    var transfer = plant.transfer;
    var location_id = plant.location.id;
    var data = {plantedassigndate: plantedassigndate, choice: choice,
      projectedharvestdate: projectedharvestdate, quantity: quantity,
      transfer: transfer, location_id: location_id, seeds_id: seedsId};
    $http.post('/seedsInUse', data);

    plantForm.plant = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
