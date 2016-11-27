angular.module('growLogApp')
       .controller('OtherFormController', OtherFormController);

function OtherFormController($http, locationService, activityService) {
  var otherForm = this;
  console.log('OtherFormController loaded');

  locationService.getLocations().then(function(response) {
    otherForm.locations = response;
    console.log(response);
  });

  // adding new task
  otherForm.addTask = function(task) {
    console.log('task', task);
    var id = task.id;

    var data = {
      location_id: task.location.id,
      type: 'other',
      assigndate: moment(task.date).format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.addActivity(data).then(function(response) {
      // empty form after clicking 'Add task'
      otherForm.task = '';
    });

  }, function(error) {
    console.log('Error posting request', error);
  };

  // updating tasks
  otherForm.updateTask = function(task) {
    var id = task.id;

    var data = {
      location_id: task.location.id,
      type: 'other',
      assigndate: moment(task.date).format('L'),
      title: task.title,
      comments: task.comments
    };
    activityService.updateActivity(id, data).then(function(response) {
      // get activities runs in service
    });
  };
  // delete task
  otherForm.deleteTask = function(id) {
    activityService.deleteActivity(id).then(function(response) {
      // get activities runs in the service
    });
  };
};
