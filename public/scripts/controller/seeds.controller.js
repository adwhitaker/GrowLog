angular.module('growLogApp')
    .controller('SeedsController', SeedsController);


function SeedsController(seedsService, locationService) {
  var seeds = this;

  seeds.allTheSeeds = seedsService;

  seeds.showDetails = function (id) {
    seeds['details' + id] = !seeds['details' + id];
    seeds['edits' + id] = false;
  };

  seeds.editDetails = function (id) {
    seeds['edits' + id] = !seeds['edits' + id];
    seeds['details' + id] = false;
  };

  seeds.editedSeed = function (plant) {
    seeds.editPlantInProgress = Object.assign({}, plant);
  };

  // update seed in DB
  seeds.updateSeed = function (updatedSeedInfo) {
    let id = updatedSeedInfo.id;
    seeds.showDetails(id);

    if (updatedSeedInfo.genericUpdated === null) {
      return;
    } else {
      updatedSeedInfo.generic = updatedSeedInfo.genericUpdated;
    }

    if (updatedSeedInfo.varietyUpdated === null) {
      return;
    } else {
      updatedSeedInfo.variety = updatedSeedInfo.varietyUpdated;
    }

    if (updatedSeedInfo.manufacturerUpdated === null) {
      return;
    } else {
      updatedSeedInfo.manufacturer = updatedSeedInfo.manufacturerUpdated;
    }

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

    seedsService.updateSeed(id, data);
  };

  // delete seed from DB
  seeds.deleteSeed = function (seedID) {
    console.log(seedID);
    seedsService.deleteSeed(seedID);
  };

};
