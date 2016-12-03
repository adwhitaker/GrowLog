angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController($http, locationService, seedsService) {
  var plantForm = this;

  plantForm.allSeeds = seedsService;
  plantForm.locationService = locationService;

  plantForm.updateCount = function (seed) {
    var total = (seed.quantity) * (seed.unitsperpack) * (seed.seedsperunit);
    plantForm.quantityHelp = 'You documented having ' + total + ' seeds.';
  };

  plantForm.updateHarvestEst = function (date, seed) {
    var days = seed.daystoharvest;
    var assigndate = moment(date).format('L');
    var estdate = moment(assigndate).add(days, 'days').format('L');
    plantForm.harvestHelp = 'Your estimated harvest date is ' + estdate + '.';
  };

  // put seed in use (plant)
  plantForm.submitPlant = function (plant) {

    console.log(plant);
    let data = {
      seedsId: plant.choice['id'],
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
