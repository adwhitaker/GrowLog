angular.module('growLogApp')
       .controller('WaterController', WaterController);

function WaterController(activityService, $scope) {
  var water = this;
  console.log('WaterController loaded');
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
      comments: waterObject.comments,
      joins_id: waterObject.id,
      users_id: waterObject.users_id,
    };
    console.log(activity);

    activityService.updateActivity(id, activity);
  };

  water.updateWater = function (id, waterObject) {
    var id = id;
    var newDate = moment(waterObject.newAssignDate).format('L');
    console.log(newDate);
    var activity = {
      location_id: waterObject.location_id,
      type: 'water',
      assigndate: newDate,
      comments: waterObject.comments,
      joins_id: waterObject.id,
      users_id: waterObject.users_id,
    };
    console.log(activity);

    activityService.updateActivity(id, activity);
  };
}
