angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController($http, locationService, activityService) {
  var issueForm = this;

  issueForm.locations = locationService;

  issueForm.addTask = function (task) {

    var data = {
      location_id: task.location.id,
      type: 'issues',
      assigndate: moment().format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.addActivity(data)
    .then(function () {
      issueForm.task = '';
    }).catch(function (err) {
      console.log('Error posting request', error);
    });
  };

}
