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
      ctrl.addUsedSeed = function(seedsId, transfer, quantity, field, section, row) {
        console.log("field", field);
              return $http.post('/seedsInUse', seedsId, transfer, quantity, field, section, row).then(function(response) {
                  console.log('response', response);
                  return response;
              });
          } //end of addUsedSeeds
} //end of seedsService
