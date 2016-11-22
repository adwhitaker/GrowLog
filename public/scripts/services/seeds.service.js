angular.module('growLogApp')
       .service('seedsService', seedsService);

function seedsService($http) {
  var ctrl = this;

  ctrl.getSeeds = function () {
    return $http.get('/addSeed').then(function (response) {
      return response;
    });
  };

  ctrl.addUsedSeed = function (seedsdata) {
    return $http.post('/seedsInUse', seedsdata).then(function (response) {
      console.log('response', response);
      return response;
    });
  }; //end of addUsedSeeds
} //end of seedsService
