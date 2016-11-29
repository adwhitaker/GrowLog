angular.module('growLogApp')
       .controller('ReportController', ReportController);

function ReportController($http) {
  var reportCtrl = this;
  console.log('ReportController loaded');
  // reportCtrl.getInfo = function() {
  //   $http.get('/reports').then(function(response) {
  //     return response;
  //   });
  // };

  reportCtrl.getInfo = function() {
    return $http.get('/reports').then(function(response) {
      console.log('resoponse', response);
        return response.data;
      });
  };
}
