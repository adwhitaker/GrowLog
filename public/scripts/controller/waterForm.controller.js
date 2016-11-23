angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController($http, locationService) {
  var waterForm = this;
  console.log('WaterFormController loaded');

  locationService.getLocations().then(function (response) {
    waterForm.locations = response;
    console.log(response);
  });

  waterForm.addActivity = function (activity) {
    var location = activity.location_id;
    var assigndate = activity.date;
    var data = {location: location, type: 'water', assigndate: assigndate
    };
    $http.post('/activity', data);

    waterForm.activity = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
