angular.module('growLogApp')
       .service('seedsService', seedsService);

function seedsService($http) {
  var ctrl = this;

  var seeds = {
    allSeeds: [],
    usedSeeds: [],
    usedSeedsPlanted:[]
  };

  this.seeds = seeds;

  ctrl.getSeeds = function () {
    return $http.get('/addSeed').then(function (response) {
      seeds.allSeeds = response.data;

      seeds.allSeeds.forEach(function (currentSeed){
        currentSeed.orderdate = moment(currentSeed.orderdate).format('L');
        currentSeed.receivedate = moment(currentSeed.receivedate).format('L');
      });

      return;
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
      let allTheSeeds = response.data

      allTheSeeds.forEach(function (currentSeed){
        currentSeed.plantedassigndate = moment(currentSeed.plantedassigndate).format('L');
        currentSeed.projectedharvestdate = moment(currentSeed.projectedharvestdate).format('L');
      });

      allTheSeeds.forEach(function (singleSeed) {
        console.log('singleseed.plantdate', singleSeed.plantdate);
        if (!singleSeed.plantdate) {
          seeds.usedSeeds.push(singleSeed);
        } else {
          seeds.usedSeedsPlanted.push(singleSeed);
        }

      });
      console.log('seeds', seeds);

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
