angular.module('growLogApp')
       .controller('PlantFormController', PlantFormController);

function PlantFormController($http, locationService, seedsService, $mdDialog) {
  var plantForm = this;

  plantForm.allSeeds = seedsService;
  plantForm.locationService = locationService;

  plantForm.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Success!')
      .textContent('You have added a seed to be planted.')
      .ariaLabel('Alert Success')
      .ok('Confirm')
    );
  };

  plantForm.updateCount = function (seed) {
    if (seed.quantity && seed.unitsperpack && seed.seedsperunit) {
      var total = (seed.quantity) * (seed.unitsperpack) * (seed.seedsperunit);
      plantForm.quantityHelp = 'You documented having ' + total + ' seeds.';
    } else if (seed.quantity && seed.unitsperpack) {
      var total = (seed.quantity) * (seed.unitsperpack);
      plantForm.quantityHelp = 'You documented having ' + total + ' ' + seed.quantityunits + '.';
    } else if (seed.seedsperunit) {
      plantForm.quantityHelp = 'You documented having ' + seed.seedsperunit + ' seeds.';
    }

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
      plantForm.showAlert();
      plantForm.plant = '';
      plantForm.quantityHelp = '';
      plantForm.harvestHelp = '';
      seedsService.getUsedSeed();
    }).catch(function () {
      console.log('Error posting request', error);
    });
  };
};
