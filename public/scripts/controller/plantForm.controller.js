angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController($http, locationService) {
  var plantForm = this;
  console.log('PlantFormController loaded');

  locationService.getLocations().then(function(response) {
    plantForm.locations = response;
  });

  plantForm.submitPlant = function(plant) {
    var plantedassigndate = moment(plant.assignDate).format('L');
    var choice = plant.choice;
    var projectedharvestdate = moment(plant.harvestDate).format('L');
    var quantity = plant.quantity;
    var transfer = plant.transfer;
    var location_id = plant.location.id;
    var data = {plantedassigndate: plantedassigndate, choice: choice,
      projectedharvestdate: projectedharvestdate, quantity: quantity,
      transfer: transfer, location_id: location_id};
    $http.post('/seedsInUse', data);

    plantForm.plant = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
