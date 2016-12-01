angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController($http, locationService) {
  var waterForm = this;

  waterForm.locationService = locationService;

  waterForm.addActivity = function (activity) {

    let data = {
      location_id: activity.location.id,
      type: 'water',
      assigndate: moment().format('L'),
      comments: activity.comments
    };

    $http.post('/activity', data)
         .then(function () {
            waterForm.activity = '';
          }).catch(function () {
            console.log('Error posting request', error);
          });
  };
};
