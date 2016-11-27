angular.module('growLogApp')
    .controller('WeedController', WeedController);

function WeedController($http, activityService, $route) {
    var weed = this;
    weed.weedArray;

    weed.refresh = function () {
      $route.reload();
    };

    console.log('WeedController loaded');
    activityService.getActivities().then(function(response) {
        weed.listActiveIssues = activityService.activitiesObject.weed;
    });

    weed.deleteActivity = function(activityId, joinsId) {

      activityService.deleteActivity(activityId, joinsId).then(weed.refresh());
    };


}; //end of weedcontroller
