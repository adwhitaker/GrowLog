angular.module('growLogApp')
       .controller('ReportController', ReportController);

function ReportController($http) {
  var reportCtrl = this;
  console.log('ReportController loaded');

  reportCtrl.getInfo = function() {
    return $http.get('/reports').then(function(response) {
        console.log('response', response);
        return response.data;
      });
  };
}
