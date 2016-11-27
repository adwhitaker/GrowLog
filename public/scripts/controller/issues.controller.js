angular.module('growLogApp')
       .controller('IssuesController', IssuesController);

function IssuesController(activityService, $route) {
  var issues = this;

  activityService.getActivities().then(function (response) {
    issues.listActiveIssues = activityService.activitiesObject.issues;
    console.log(issues.listActiveIssues);
  });

  issues.refresh = function () {
    $route.reload();
  };

  //delete issue
  issues.deleteIssue = function (activityId, joinsId) {
    activityService.deleteActivity(activityId, joinsId).then(issues.refresh());
  };

  issues.completeIssue = function(id, issueObject) {
    var id = id;
    var completeDate = new Date();
    var dd = completeDate.getDate();
    var mm = completeDate.getMonth() + 1;
    var yyyy = completeDate.getFullYear();
    var completeDate = yyyy + '-' + mm + '-' + dd;


    var activity = {
      location_id: issueObject.location_id,
      type: 'issues',
      assigndate: issueObject.assigndate,
      completedate: completeDate,
      title: issueObject.title,
      comments: issueObject.comments,
      joins_id: issueObject.id,
      users_id: issueObject.users_id,
    };
    console.log(activity);

    activityService.updateActivity(id, activity).then(issues.refresh());
  };

  console.log('IssuesController loaded');

}
