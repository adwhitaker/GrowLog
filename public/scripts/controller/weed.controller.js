angular.module('growLogApp')
       .controller('WeedController', WeedController);
function WeedController($http, activityService) {
  var weed = this;
  weed.weedArray;
  console.log('WeedController loaded');
  activityService.getActivities().then(function (response) {
    weed.listActiveIssues = activityService.activitiesObject.weed;
  });
  

};//end of weedcontroller
