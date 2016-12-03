angular.module('growLogApp')
       .controller('NewSeedFormController', NewSeedFormController);

function NewSeedFormController($http, seedsService, $mdDialog) {
  var newSeed = this;
  console.log('NewSeedFormController loaded');

  newSeed.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Success!')
      .textContent('You have added a seed.')
      .ariaLabel('Alert Success')
      .ok('Confirm')
    );
  };

  newSeed.addSeed = function (seed) {
    var data = {
      generic: seed.generic,
      variety: seed.variety,
      family: 'demo',
      orderdate: '1/1/2016',
      quantity: seed.quantity,
      unitsperpack: '1',
      quantityunits: 'demo',
      seedsperunit: '1',
      manufacturer: seed.manufacturer,
      supplier: 'demo',
      daystoharvest: seed.daystoharvest,
      receivedate: seed.receivedate,
      lotnumber: 'demo',
      donation: seed.donation,
      plantouse: seed.plantouse
    };

    seedsService.addSeed(data)
    .then(function () {
      newSeed.showAlert();
      newSeed.seed = '';
    });

  };
};
