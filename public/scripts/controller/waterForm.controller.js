angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController($http, locationService, activityService) {
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
      assigndate: moment(activity.date).format('L')
    }
    activityService.addActivity(data).then(function(response) {
      waterForm.activity = '';
    });
  }, function(error) {
    console.log('Error posting request', error);
  };

  // update task
  waterForm.updateTask = function(task) {
    var id = task.id;

    var data = {
      location_id: activity.location.id,
      type: 'water',
      assigndate: moment(activity.date).format('L')
    };
    activityService.updateActivity(id, data).then(function(response) {
      // get activities runs in the service
    });
  };
  // delete task
  waterForm.deleteTask = function(id) {
    activityService.deleteActivity(id).then(function(response) {
      // get activities runs in the service
    });
  };
};
