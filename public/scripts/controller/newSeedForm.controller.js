angular.module('growLogApp')
       .controller('NewSeedFormController', NewSeedFormController);

function NewSeedFormController($http, seedsService) {
  var newSeed = this;
  console.log('NewSeedFormController loaded');

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
      // empty form after clicking 'submit'
      newSeed.seed = '';
    });

  };
};
