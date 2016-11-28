angular.module('growLogApp')
       .controller('IssuesController', IssuesController);

function IssuesController(activityService, $route) {
  var issues = this;

  issues.activities = activityService;

  activityService.getActivities();

  //delete issue
  issues.deleteIssue = function (activityId, joinsId) {
    activityService.deleteActivity(activityId, joinsId);
  };

  issues.completeIssue = function(id, issueObject) {
    var id = id;
    var completeDate = new Date();
    var completeDate = moment(completeDate).format('L');

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

    activityService.updateActivity(id, activity);

  };

  issues.updateIssue = function(id, issueObject) {
    var id = id;
    var activity = {
      location_id: issueObject.location_id,
      type: 'issues',
      assigndate: issueObject.assigndate,
      title: issueObject.title,
      comments: issueObject.comments,
      joins_id: issueObject.id,
      users_id: issueObject.users_id,
    };
    console.log(activity);

    activityService.updateActivity(id, activity);
  };

  console.log('IssuesController loaded');

}
