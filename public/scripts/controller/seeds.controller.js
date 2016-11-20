angular.module('growLogApp')
    .controller('SeedsController', SeedsController);


function SeedsController(seedsService) {
    console.log('SeedsController loaded');
    var ctrl = this;
    ctrl.seedArray = [];
    ctrl.getSeeds = function() {
        console.log('get seeds');
        seedsService.getSeeds().then(function(response) {
            console.log("response", response);
            ctrl.seedArray = response.data;
            //  console.log('get seed array', seeds.seedArray);
            console.log('get seed array', ctrl.seedArray);


        });
        // empty form after clicking 'submit'
        // seeds.seed = '';
    }

    ctrl.addUsedSeed = function(field) {
        console.log('add used seed');
        console.log("field", field);
        // seedsService.addUsedSeed().then(function(response) {
        //     console.log("response", response);
        // })
    }

}
