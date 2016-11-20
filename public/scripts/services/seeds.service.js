angular.module('growLogApp').service('seedsService', seedsService);





function seedsService($http) {
  var ctrl = this;
  console.log("seedsservice");
  ctrl.getSeeds = function() {
          return $http.get('/addSeed').then(function(response) {
              console.log('response', response);
              return response; //!!!!!!!!!!
          });
      } //end of getSeeds

      ctrl.getUsedSeeds = function() {
              return $http.post('/seedsInUse', transfer, quantity, field, section, row).then(function(response) {
                  console.log('response', response);
                  return response; //!!!!!!!!!!
              });
          } //end of getSeeds
} //end of seedsService
