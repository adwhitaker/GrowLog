angular.module('growLogApp')
       .controller('ReportController', ReportController);

function ReportController($http) {
  var reportCtrl = this;

  reportCtrl.getInfo = function() {
    return $http.get('/reports').then(function(response) {
        return response.data;
      });
  };
}
