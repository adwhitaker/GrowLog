angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController($http, locationService, activityService) {
  var issueForm = this;
  console.log('IssueFormController loaded');

  // gets all the locations from the DB through location.service
  locationService.getLocations().then(function(response) {
    issueForm.locations = response;
    console.log(response);
  });

  // adds a new task to the DB through activity.service
  issueForm.addTask = function(task) {

    var data = {
      location_id: task.location.id,
      type: 'issues',
      assigndate: moment(task.date).format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.addActivity(data).then(function(response) {
      issueForm.task = '';
    });

  }, function(error) {
    console.log('Error posting request', error);
  };

  // update Task
  issueForm.updateTask = function(task) {
    var id = task.id; // need task id from DOM 

    var data = {
      location_id: task.location.id,
      type: 'issues',
      assigndate: moment(task.date).format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.updateActivity(id, data).then(function(response) {
      // reset form is need be // get activities runs in the service
    });
  };

  // delete task
  issueForm.deleteTask = function(id) {

    activityService.deleteActivity(id).then(function(response) {
      // get activities runs in the service
    });
  };
};
