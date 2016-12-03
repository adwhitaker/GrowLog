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
      family: seed.family,
      orderdate: seed.orderdate,
      quantity: seed.quantity,
      unitsperpack: seed.unitsperpack,
      quantityunits: seed.quantityunits,
      seedsperunit: seed.seedsperunit,
      manufacturer: seed.manufacturer,
      supplier: seed.supplier,
      daystoharvest: seed.daystoharvest,
      receivedate: seed.receivedate,
      lotnumber: seed.lotnumber,
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
