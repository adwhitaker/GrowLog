angular.module('growLogApp')
    .controller('SeedsController', SeedsController);


function SeedsController(seedsService, locationService) {
    console.log('SeedsController loaded');
    var ctrl = this;
    ctrl.seedArray = [];

    locationService.getLocations().then(function (response) {
      ctrl.locations = response;
      console.log(response);
    });

    ctrl.getSeeds = function() {
        console.log('get seeds');
        seedsService.getSeeds().then(function(response) {
            console.log("response", response);
            ctrl.seedArray = response.data;
            console.log('get seed array', ctrl.seedArray);


        });
        // empty form after clicking 'submit'
        // seeds.seed = '';
    }

    ctrl.addUsedSeed = function(seedsId, transfer, quantity, location) {
      var seedsdata = {
        seedsId: seedsId,
        transfer: transfer,
        quantity: quantity,
        location: location
      }
      console.log("seedsdata", seedsdata);
        seedsService.addUsedSeed(seedsdata).then(function(response) {
            console.log("response", response);
        })
    }



}
