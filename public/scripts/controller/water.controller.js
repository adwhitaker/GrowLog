angular.module('growLogApp')
       .controller('WaterController', WaterController);

function WaterController(activityService, $route) {
  var water = this;
  console.log('WaterController loaded');

  activityService.getActivities().then(function(response) {
    water.listActiveIssues = activityService.activitiesObject.water;
  });

  water.refresh = function() {
    $route.reload();
  };
  // delete
  water.deleteWater = function(activityId, joinsId) {
    activityService.deleteActivity(activityId, joinsId).then(water.refresh());
  };
  water.completeWater = function(id, waterObject) {
    var id = id;
    var completeDate = new Date();
    var yyyy = completeDate.getFullYear();
    var mm = completeDate.getMonth() + 1;
    var dd = completeDate.getDate();
    var completeDate = yyyy + '-' + mm + '-' + dd;

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
    activityService.updateActivity(id, activity).then(water.refresh());
  };
}
