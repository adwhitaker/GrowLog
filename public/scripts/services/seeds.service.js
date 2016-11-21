angular.module('growLogApp').service('seedsService', seedsService);





function seedsService($http) {
  var ctrl = this;
  console.log("seedsservice");
  ctrl.getSeeds = function() {
          return $http.get('/addSeed').then(function(response) {
              console.log('response', response);
              return response;
          });
      } //end of getSeeds
      ctrl.addUsedSeed = function(seedsdata) {
        console.log("seedsdata", seedsdata);

              return $http.post('/seedsInUse', seedsdata).then(function(response) {
                  console.log('response', response);
                  return response;
              });
          } //end of addUsedSeeds
} //end of seedsService
