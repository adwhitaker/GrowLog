angular.module('growLogApp')
       .service('seedsService', seedsService);

function seedsService($http) {
  var ctrl = this;

  var seeds = {
    allSeeds: [],
    usedSeeds: [],
    usedSeedsPlanted:[],
    usedSeedsHarvested: []
  };

  this.seeds = seeds;

  /* All Seeds */

  // get all seeds from DB
  ctrl.getSeeds = function () {
    return $http.get('/addSeed')
      .then(function (response) {
        ctrl.seeds.allSeeds = [];

        seeds.allSeeds = response.data;

        seeds.allSeeds.forEach(function (currentSeed) {
          currentSeed.orderdate = moment(currentSeed.orderdate).format('L');
          currentSeed.receivedate = moment(currentSeed.receivedate).format('L');
        });

        return;
      }).catch(function (err) {
        console.log('err', err);
      });
  };

  // add new seed to the DB, then get seeds from DB
  ctrl.addSeed = function (data) {
    return $http.post('/addSeed', data)
      .then(function () {
        ctrl.getSeeds();
        return;
      }).catch(function (err) {
        console.log('err', err);
      });
  };

  // update seed in the DB, then get all seeds from DB
  ctrl.updateSeed = function (id, data) {
    return $http.put('/addSeed/' + id, data)
      .then(function () {
        ctrl.getSeeds();
        return;
      }).catch(function (err) {
        console.log('err', err);
      });
  };

  // delete seed in DB, then get all seeds from DB
  ctrl.deleteSeed = function (seedID) {
    return $http.delete('addSeed/' + seedID)
      .then(function () {
        ctrl.getSeeds();
        return;
      }).catch(function (err) {
        console.log('err', err);
        return 'error';
      });
  };

  /* Seeds Currently in Use (Planted) */

  // get all used seeds (Planted) fom DB
  this.getUsedSeed = function () {
    return $http.get('/seedsInUse').then(function (response) {
      ctrl.seeds.usedSeeds = [];
      ctrl.seeds.usedSeedsPlanted = [];
      ctrl.seeds.usedSeedsHarvested = [];

      let allTheSeeds = response.data;

      allTheSeeds.forEach(function (currentSeed) {
        // convert with moment
        // currentSeed.orderdate = moment(currentSeed.orderdate).format('L');
        // currentSeed.plantdate = moment(currentSeed.orderdate).format('L');
        // currentSeed.receivedate = moment(currentSeed.receivedate).format('L');
        // currentSeed.actualharvestdate = moment(currentSeed.actualharvestdate).format('L');
        currentSeed.plantedassigndate = moment(currentSeed.plantedassigndate).format('L');
        currentSeed.projectedharvestdate = moment(currentSeed.projectedharvestdate).format('L');
      });

      allTheSeeds.forEach(function (singleSeed) {
        if (singleSeed.actualharvestdate) {
          seeds.usedSeedsHarvested.push(singleSeed);
        } else if (singleSeed.plantdate) {
          seeds.usedSeedsPlanted.push(singleSeed);
        } else {
          seeds.usedSeeds.push(singleSeed);
        }

      });

      console.log('all seeds',seeds);
      return;
    }).catch(function (err) {
      console.log('err', err);
    });
  };

  // add seed to be planted (seed in use)
  ctrl.addUsedSeed = function (seedsdata) {
    return $http.post('/seedsInUse', seedsdata)
      .then(function (response) {
        ctrl.getUsedSeed();
        return response;
      });
  };

  // update used seed in DB
  ctrl.updateUsedSeed = function (usedSeedUpdate) {
    let id = usedSeedUpdate.seedsinuse_id;
    return $http.put('/seedsInUse/' + id, usedSeedUpdate).then(function (response) {
      ctrl.getUsedSeed();
    });
  };

  // initial get used seeds from DB
  ctrl.getSeeds();
  ctrl.getUsedSeed();

};
