angular.module('growLogApp')
       .service('seedsService', seedsService);

function seedsService($http) {
  var ctrl = this;

  var seeds = {
    seeds: [],
    usedSeeds: []
  };

  this.seeds = seeds;

  ctrl.getSeeds = function () {
    return $http.get('/addSeed').then(function (response) {
      return response.data;
    }).catch(function (err) {
      console.log('err', err);
    });
  };

  ctrl.addUsedSeed = function (seedsdata) {
    return $http.post('/seedsInUse', seedsdata).then(function (response) {
      console.log('response', response);
      return response;
    });
  }; //end of addUsedSeeds

  // get used seeds fom DB
  this.getUsedSeed = function () {
    return $http.get('/seedsInUse').then(function (response) {
      seeds.usedSeeds = response.data;

      seeds.usedSeeds.forEach(function (currentSeed){
        currentSeed.plantedassigndate = moment(currentSeed.plantedassigndate).format('L');
        currentSeed.projectedharvestdate = moment(currentSeed.projectedharvestdate).format('L');
      });
      return;
    }).catch(function (err) {
      console.log('err', err);
    });
  };

  // update used seed in DB
  ctrl.updateUsedSeed = function (usedSeedUpdate) {
    let id = usedSeedUpdate.seedsinuse_id;

    return $http.put('/seedsInUse/' + id, usedSeedUpdate).then(function (response) {
      ctrl.getUsedSeed();
    });
  }

  // initial get used seeds from DB
  ctrl.getUsedSeed();
  ctrl.getSeeds();

} //end of seedsService
