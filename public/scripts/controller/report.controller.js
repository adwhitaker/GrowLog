angular.module('growLogApp')
       .controller('ReportController', ReportController);

function ReportController($http) {
  var reportCtrl = this;

  // get reports from DB
  reportCtrl.getInfo = function (dates) {
    var newDates = {
      start: dates.start,
      end: dates.end
    };

    return $http.get('/reports')
    .then(function (response) {
        return response.data;
      });
  };
}
