angular.module('growLogApp')
    .controller('WeedController', WeedController);

function WeedController($http, activityService) {
    var weed = this;
    weed.weedArray;
    console.log('WeedController loaded');
    activityService.getActivities().then(function(response) {
        weed.listActiveIssues = activityService.activitiesObject.weed;
    });

    weed.deleteActivity = function(id, joins_id) {
        var data = {
            id: id,
            joins_id: joins_id
        }
        activityService.deleteActivity(data).then(function(response) {});
    };


}; //end of weedcontroller
