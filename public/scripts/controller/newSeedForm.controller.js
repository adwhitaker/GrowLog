angular.module('growLogApp')
       .controller('NewSeedFormController', NewSeedFormController);

function NewSeedFormController($http) {
  var newSeed = this;
  console.log('NewSeedFormController loaded');

  newSeed.addSeed = function(seed) {
    var generic = seed.generic;
    var variety = seed.variety;
    var family = seed.family;
    var orderdate = seed.orderdate;
    var quantity = seed.quantity;
    var unitsperpack = seed.unitsperpack;
    var quantityunits = seed.quantityunits;
    var seedsperunit = seed.seedsperunit;
    var manufacturer = seed.manufacturer;
    var supplier = seed.supplier;
    var daystoharvest = seed.daystoharvest;
    var receivedate = seed.receivedate;
    var lotnumber = seed.lotnumber;
    var donation = seed.donation;
    var plantouse = seed.plantouse;
    var data = {generic: generic, variety: variety, family: family,
      orderdate: orderdate, quantity: quantity, unitsperpack: unitsperpack,
      quantityunits: quantityunits, seedsperunit: seedsperunit,
      manufacturer: manufacturer, supplier: supplier,
      daystoharvest: daystoharvest, receivedate: receivedate,
      lotnumber: lotnumber, donation: donation, plantouse: plantouse
    };
    $http.post('/addSeed', data);

    // empty form after clicking 'submit'
    newSeed.seed = '';
  }, function(error) {
    console.log('error posting request', error);
  };
}
