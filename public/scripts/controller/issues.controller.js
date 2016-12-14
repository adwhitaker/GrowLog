angular.module('growLogApp')
       .controller('IssuesController', IssuesController);

function IssuesController(activityService, $route) {
  var issues = this;

  issues.showDetails = function (id) {
    issues['details' + id] = !issues['details' + id];
    issues['edits' + id] = false;
    issues['complete' + id] = false;
  };

  issues.editDetails = function (id) {
    issues['edits' + id] = !issues['edits' + id];
    issues['details' + id] = false;
    issues['complete' + id] = false;
  };

  issues.markComplete = function (id, check) {
    issues['complete' + id] = !issues['complete' + id];
    issues['edits' + id] = false;
    issues['details' + id] = false;
    if (check === 'check_box_outline_blank') {
      check = 'check_box';
    } else {
      check = 'check_box_outline_blank';
    }
  };

  issues.activities = activityService;

  activityService.getActivities();

  //delete issue
  issues.deleteIssue = function (activityId, joinsId) {
    activityService.deleteActivity(activityId, joinsId);
  };

  issues.completeIssue = function (id, issueObject) {
    issues.markComplete(id);

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
    activityService.updateActivity(id, activity);

  }

  issues.updateIssue = function (id, issueObject) {
    issues.showDetails(id);

    var activity = {
      location_id: issueObject.location_id,
      type: 'issues',
      assigndate: issueObject.assigndate,
      title: issueObject.updatedTitle,
      comments: issueObject.updatedComments,
      joins_id: issueObject.id,
      users_id: issueObject.users_id,
    };

    activityService.updateActivity(id, activity);
  }
}
