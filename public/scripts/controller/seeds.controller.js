angular.module('growLogApp')
    .controller('SeedsController', SeedsController);


function SeedsController(seedsService, locationService) {
  console.log('SeedsController loaded');
  var seeds = this;

  seeds.allTheSeeds = seedsService;

  locationService.getLocations().then(function (response) {
      seeds.locations = response;
      console.log(response);
    });

  seeds.getSeeds = function() {
        console.log('get seeds');
        seedsService.getSeeds().then(function(response) {
            console.log("response", response);
            seeds.seedArray = response.data;
            console.log('get seed array', seeds.seedArray);


        });
        // empty form after clicking 'submit'
        // seeds.seed = '';
      };

  seeds.addUsedSeed = function(seedsId, transfer, quantity, location) {
      var seedsdata = {
        seedsId: seedsId,
        transfer: transfer,
        quantity: quantity,
        location: location
      };

      seedsService.addUsedSeed(seedsdata).then(function(response) {
          console.log('response', response);
        });
    };

  seeds.updateSeed = function () {
    //
  };

  seeds.deleteSeed = function () {
    //
  };

}
