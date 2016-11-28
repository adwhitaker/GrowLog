angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController($http, locationService) {
  var waterForm = this;
  console.log('WaterFormController loaded');

  locationService.getLocations().then(function(response) {
    waterForm.locations = response;
    console.log(response);
  });

  waterForm.addActivity = function(activity) {

    var data = {
      location_id: activity.location.id,
      type: 'water',
      assigndate: moment(activity.date).format('L'),
      comments: activity.comments
    };
    $http.post('/activity', data);
    waterForm.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
};
