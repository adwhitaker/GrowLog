angular.module('growLogApp')
       .controller('OthersController', OthersController);

function OthersController(activityService, $route) {
  var others = this;
  console.log('OthersController loaded');

  others.activities = activityService;
  console.log(others.activities);

  activityService.getActivities();

  others.showDetails = function (id) {
    others['details' + id] = !others['details' + id];
    others['edits' + id] = false;
    others['complete' + id] = false;
  };

  others.editDetails = function (id) {
    others['edits' + id] = !others['edits' + id];
    others['details' + id] = false;
    others['complete' + id] = false;
  };

  others.markComplete = function (id, check) {
    others['complete' + id] = !others['complete' + id];
    others['edits' + id] = false;
    others['details' + id] = false;
    if (check === 'check_box_outline_blank') {
      check = 'check_box';
    } else {
      check = 'check_box_outline_blank';
    }
  };

  // delete
  others.deleteOther = function(activityId, joinsId) {
    console.log('activityID', activityId);
    console.log('joinsId', joinsId);
    console.log('Delete button clicked');
    activityService.deleteActivity(activityId, joinsId);
  };

  // mark as complete
  others.completeOther = function(id, otherObject) {
    others.showDetails(id);
    var id = id;
    var completeDate = new Date();
    var completeDate = moment(completeDate).format('L');

    var activity = {
      location_id: otherObject.location_id,
      type: 'other',
      assigndate: otherObject.assigndate,
      completedate: completeDate,
      title: otherObject.title,
      comments: otherObject.comments,
      joins_id: otherObject.id,
      users_id: otherObject.users_id,
    };
    activityService.updateActivity(id, activity);
  };

  others.updateOther = function(id, otherObject) {
    others.showDetails(id);
    if(otherObject.updatedTitle === null) {
      return;
    } else {
      otherObject.title = otherObject.updatedTitle;
    }

    var id = id;
    var activity = {
      location_id: otherObject.location_id,
      type: 'other',
      assigndate: otherObject.assigndate,
      title: otherObject.title,
      comments: otherObject.comments,
      joins_id: otherObject.joins_id,
      users_id: otherObject.users_id,
    };
    activityService.updateActivity(id, activity);
  };
}
