angular.module('growLogApp')
       .controller('OtherController', OtherController);

function OtherController(activityService) {
  var other = this;
  console.log('OtherController loaded');

  activityService.getActivities().then(function(response) {
    other.listActiveTasks = activityService.activitiesObject.other;
  });

}
