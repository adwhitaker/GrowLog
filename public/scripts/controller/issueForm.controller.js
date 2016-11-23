, angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController($http, locationService) {
  var issueForm = this;
  console.log('IssueFormController loaded');
  locationService.getLocations().then(function(response) {
    issueForm.locations = response;
    console.log(response);
  });

  issueForm.addTask = function(task) {
    console.log('task', task);
    var location = task.location_id;
    var assigndate = moment(task.date).format('L');
    var title = task.title;
    var comments = task.comments;
    var data = {location: location, type: 'issues', assigndate: assigndate, title: title, comments: comments
    };
    $http.post('/activity', data);

    issueForm.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
