angular.module('growLogApp')
       .controller('IssuesController', IssuesController);

function IssuesController(activityService) {
  var issues = this;

  activityService.getActivities().then(function (response) {
    issues.listActiveIssues = activityService.activitiesObject.issues;
  });

  console.log('IssuesController loaded');
}
