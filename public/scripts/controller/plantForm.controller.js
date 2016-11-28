angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController($http, locationService, seedsService) {
  var plantForm = this;
  console.log('PlantFormController loaded');

  seedsService.getSeeds().then(function (response) {
    plantForm.allSeeds = response;
    console.log(response);
  });

  locationService.getLocations().then(function (response) {
    plantForm.locations = response;
  });

  plantForm.submitPlant = function(plant) {
    var seedsId = plant.choice.id;
    var plantedassigndate = moment(plant.assignDate).format('L');
    var projectedharvestdate = moment(plant.harvestDate).format('L');
    var quantity = plant.quantity;
    var transfer = plant.transfer;
    var location_id = plant.location.id;
    console.log(location_id);
    var data = {seedsId: seedsId, transfer: transfer,
                plantedassigndate: plantedassigndate,
                projectedharvestdate: projectedharvestdate, quantity: quantity,
                location_id: location_id};
    $http.post('/seedsInUse', data);

    plantForm.plant = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
