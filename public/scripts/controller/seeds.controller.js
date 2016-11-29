angular.module('growLogApp')
    .controller('SeedsController', SeedsController);


function SeedsController(seedsService, locationService) {
  var seeds = this;

  seeds.allTheSeeds = seedsService;

  // update seed in DB
  seeds.updateSeed = function (updatedSeedInfo) {

    let data = {
      generic: updatedSeedInfo.generic,
      variety: updatedSeedInfo.variety,
      family: updatedSeedInfo.family,
      orderdate: moment(updatedSeedInfo.orderdate).format('L'),
      quantity: updatedSeedInfo.quantity,
      unitsperpack: updatedSeedInfo.unitsperpack,
      quantityunits: updatedSeedInfo.quantityunits,
      seedsperunit: updatedSeedInfo.seedsperunit,
      manufacturer: updatedSeedInfo.manufacturer,
      supplier: updatedSeedInfo.supplier,
      daystoharvest: updatedSeedInfo.daystoharvest,
      receivedate: moment(updatedSeedInfo.receivedate).format('L'),
      lotnumber: updatedSeedInfo.lotnumber,
      donation: updatedSeedInfo.donation,
      plantouse: updatedSeedInfo.plantouse
    };

  };

  // delete seed from DB
  seeds.deleteSeed = function (seedID) {
    seedsService.deleteSeed(seedID);
  };

};
