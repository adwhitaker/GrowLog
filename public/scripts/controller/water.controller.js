angular.module('growLogApp')
       .controller('WaterController', WaterController);

function WaterController(activityService) {
  var water = this;
  console.log('WaterController loaded');

  activityService.getActivities().then(function(response) {
    water.listActiveIssues = activityService.activitiesObject.water;
  });
}
