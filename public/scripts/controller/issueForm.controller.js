angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController($http, locationService) {
  var issueForm = this;

  locationService.getLocations().then(function (response) {
    issueForm.locations = response;
  });

  issueForm.addTask = function (task) {
    var location_id = task.location.id;
    var assigndate = moment().format('L');
    var title = task.title;
    var comments = task.comments;
    var data = {location_id: location_id, type: 'issues', assigndate: assigndate, title: title, comments: comments};
    $http.post('/activity', data);

    issueForm.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
