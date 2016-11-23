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
      seeds.seeds = response.data;
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

  this.getUsedSeed = function () {
    return $http.get('/seedsInUse').then(function (response) {
      seeds.usedSeeds = response.data;
      return;
    }).catch(function (err) {
      console.log('err', err);
    });
  };

  // initial get used seeds from DB
  ctrl.getUsedSeed();
  ctrl.getSeeds();

} //end of seedsService
