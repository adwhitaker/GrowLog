angular.module('growLogApp')
    .controller('WeedController', WeedController);

function WeedController($http, activityService, $route) {
    var weed = this;
    weed.weedArray;

    weed.refresh = function () {
      $route.reload();
    };

    weed.activities = activityService;

    activityService.getActivities();

//weed.issues object = activitiesService
    weed.deleteActivity = function(activityId, joinsId) {

      activityService.deleteActivity(activityId, joinsId).then(weed.refresh());
    };

    weed.completeIssue = function(id, weedObject) {
      var id = id;
      var completeDate = new Date();
      var completeDate = moment(completeDate).format('L');

      var activity = {
        location_id: weedObject.location_id,
        type: 'weed',
        assigndate: weedObject.assigndate,
        completedate: completeDate,
        duration: weedObject.duration,
        comments: weedObject.comments,
        joins_id: weedObject.id,
        users_id: weedObject.users_id,
      };
      console.log(activity);

      activityService.updateActivity(id, activity).then(weed.refresh());


      weed.updateIssue = function(id, weedObject) {
        var id = id;
        var activity = {
          location_id: weedObject.location_id,
          type: 'weed',
          assigndate: weedObject.assigndate,
          title: weedObject.title,
          comments: weedObject.comments,
          joins_id: weedObject.id,
          users_id: weedObject.users_id,
        };
        console.log(activity);

        activityService.updateActivity(id, activity).then(weed.refresh());
      };


};
}; //end of weedcontroller
