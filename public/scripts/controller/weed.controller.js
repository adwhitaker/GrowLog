angular.module('growLogApp')
       .controller('WeedController', WeedController);
function WeedController($http, activityService) {
  var weed = this;
  weed.weedArray;
  console.log('WeedController loaded');
  activityService.getActivities().then(function (response) {
    weed.listActiveIssues = activityService.activitiesObject.weed;
  });
//   weed.getActivities = function() {
//       $http.get('/activity').then(function(response){
//       weed.weedArray = response.data;
//       console.log(weed.weedArray);
//       weed.weedArray.assigndate = moment(weed.weedArray.assigndate).format('L');
//       weed.weedArray.completedate = moment(weed.weedArray.assigndate).format('L');
//
//       console.log('formatted date with moment', weed.weedArray.assigndate);
//     }, function(error) {
//       console.log('Error posting request', error);
//     });
// //end of getActivities
// };
};//end of weedcontroller
