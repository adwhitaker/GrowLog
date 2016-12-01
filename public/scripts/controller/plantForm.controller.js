angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController($http, locationService, seedsService) {
  var plantForm = this;

  plantForm.allSeeds = seedsService;
  plantForm.locationService = locationService;

  // put seed in use (plant)
  plantForm.submitPlant = function (plant) {

    console.log(plant);
    let data = {
      seedsId: plant.choice.id,
      transfer: plant.transfer,
      plantedassigndate: moment(plant.assignDate).format('L'),
      projectedharvestdate: moment(plant.harvestDate).format('L'),
      usedquantity: plant.usedquantity,
      location_id: plant.location.id
    };

    $http.post('/seedsInUse', data)
    .then(function () {
      plantForm.plant = '';
      seedsService.getUsedSeed();
    }).catch(function () {
      console.log('Error posting request', error);
    });
  };
};
