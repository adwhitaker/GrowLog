angular.module('growLogApp')
       .controller('WaterController', WaterController);

function WaterController(activityService, $route) {
  var water = this;

  water.showDetails = function (id) {
    water['details' + id] = !water['details' + id];
    water['edits' + id] = false;
    water['complete' + id] = false;
  };

  water.editDetails = function (id) {
    water['edits' + id] = !water['edits' + id];
    water['details' + id] = false;
    water['complete' + id] = false;
  };

  water.markComplete = function (id, check) {
    water['complete' + id] = !water['complete' + id];
    water['edits' + id] = false;
    water['details' + id] = false;
    if (check === 'check_box_outline_blank') {
      check = 'check_box';
    } else {
      check = 'check_box_outline_blank';
    }
  };



  water.activities = activityService;

  activityService.getActivities();

  water.deleteWater = function (activityId, joinsId) {
    activityService.deleteActivity(activityId, joinsId)
  };

  water.completeWater = function(id, waterObject) {
    var id = id;
    var completeDate = moment().format('L');

    var activity = {
      location_id: waterObject.location_id,
      type: 'water',
      assigndate: waterObject.assigndate,
      completedate: completeDate,
      title: waterObject.title,
      duration: waterObject.duration,
      amount: waterObject.amount,
      comments: waterObject.comments,
      joins_id: waterObject.id,
      users_id: waterObject.users_id,
    };

    activityService.updateActivity(id, activity);
  };

  water.updateWater = function (id, waterObject) {
    water.showDetails(id);
    var id = id;
    var newDate = moment(waterObject.newAssignDate).format('L');
    var activity = {
      location_id: waterObject.location_id,
      type: 'water',
      assigndate: newDate,
      comments: waterObject.comments,
      joins_id: waterObject.id,
      users_id: waterObject.users_id,
      duration: waterObject.duration,
      amount: waterObject.amount
    };

    activityService.updateActivity(id, activity);
  };
}
