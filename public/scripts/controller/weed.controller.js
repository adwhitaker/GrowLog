angular.module('growLogApp')
    .controller('WeedController', WeedController);

function WeedController($http, activityService, $route) {
    var weed = this;
    weed.weedArray;

    weed.showDetails = function (id) {
      weed['details' + id] = !weed['details' + id];
      weed['edits' + id] = false;
      weed['complete' + id] = false;
    };

    weed.editDetails = function (id) {
      weed['edits' + id] = !weed['edits' + id];
      weed['details' + id] = false;
      weed['complete' + id] = false;
    };

    weed.markComplete = function (id, check) {
      weed['complete' + id] = !weed['complete' + id];
      weed['edits' + id] = false;
      weed['details' + id] = false;
      if (check === 'check_box_outline_blank') {
        check = 'check_box';
      } else {
        check = 'check_box_outline_blank';
      }
    };

    weed.activities = activityService;

    activityService.getActivities();

    weed.deleteActivity = function(activityId, joinsId) {
      activityService.deleteActivity(activityId, joinsId);
    };

    weed.completeWeed = function(id, weedObject) {
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

      activityService.updateActivity(id, activity);

};
      weed.updateWeed = function(id, weedObject) {
        weed.showDetails(id);

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

        activityService.updateActivity(id, activity);
      };


}; //end of weedcontroller
