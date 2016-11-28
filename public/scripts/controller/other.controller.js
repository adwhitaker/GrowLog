angular.module('growLogApp')
       .controller('OtherController', OtherController);

function OtherController(activityService, $route) {
  var other = this;
  console.log('OtherController loaded');

  activityService.getActivities().then(function(response) {
    other.listActiveTasks = activityService.activitiesObject.other;
  });
  other.refresh = function() {
    $route.reload();
  };
  // delete
  other.deleteOther = function(activityId, joinsId) {
    activityService.deleteActivity(activityId, joinsId).then(other.refresh());
  };
  other.completeOther = function(id, otherObject) {
    var id = id;
    var completeDate = new Date();
    var yyyy = completeDate.getFullYear();
    var mm = completeDate.getMonth() + 1;
    var dd = completeDate.getDate();
    var completeDate = yyyy + '-' + mm + '-' + dd;

    var activity = {
      location_id: otherObject.location_id,
      type: 'other',
      assigndate: otherObject.assigndate,
      completedate: completeDate,
      title: otherObject.title,
      comments: otherObject.comments,
      joins_id: otherObject.joins_id,
      users_id: otherObject.users_id,
    };
    activityService.updateActivity(id, activity).then(other.refresh());
  };
}
