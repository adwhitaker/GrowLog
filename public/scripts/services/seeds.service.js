angular.module('growLogApp')
       .service('seedsService', seedsService);

function seedsService($http) {
  var ctrl = this;

  // all seeds from DB are stored here
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
          currentSeed.orderdate = currentSeed.orderdate === null ? null : new Date(currentSeed.orderdate);
          currentSeed.receivedate = currentSeed.receivedate === null ? null : new Date(currentSeed.receivedate);
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
    return $http.delete('/addSeed/' + seedID)
      .then(function () {
        ctrl.getSeeds();
        return;
      }).catch(function (err) {
        return err;
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
        currentSeed.orderdate = currentSeed.orderdate === null ? null : new Date(currentSeed.orderdate);
        currentSeed.plantdate = currentSeed.plantdate === null ? null : new Date(currentSeed.orderdate);
        currentSeed.receivedate = currentSeed.receivedate === null ? null : new Date(currentSeed.receivedate);
        currentSeed.actualharvestdate = currentSeed.actualharvestdate === null ? null : new Date(currentSeed.actualharvestdate);
        currentSeed.plantedassigndate = currentSeed.plantedassigndate === null ? null : new Date(currentSeed.plantedassigndate);
        currentSeed.projectedharvestdate = currentSeed.projectedharvestdate === null ? null : new Date(currentSeed.projectedharvestdate);
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
      }).catch(function (err) {
        console.log('err', err);
      });
  };

  // update used seed in DB
  ctrl.updateUsedSeed = function (usedSeedUpdate) {
    let id = usedSeedUpdate.seedsinuse_id;
    return $http.put('/seedsInUse/' + id, usedSeedUpdate)
      .then(function (response) {
        ctrl.getUsedSeed();
      }).catch(function (err) {
        console.log('err', err);
      });
  };

  // delete used seed in DB, then get all seeds from DB
  ctrl.deleteUsedSeed = function (usedSeedDelete) {
    let id = usedSeedDelete.seedsinuse_id;

    let data = {
      location_id: usedSeedDelete.location_id,
      join_id: usedSeedDelete.join_id
    };

    return $http.delete('/seedsInUse/' + id, { params: data })
      .then(function () {
        ctrl.getUsedSeed();
        return;
      }).catch(function (err) {
        console.log('err', err);
        return 'error';
      });
  };

  // initial get used seeds from DB
  ctrl.getSeeds();
  ctrl.getUsedSeed();

};
