angular.module('growLogApp')
       .controller('ActivityController', ActivityController);

function ActivityController(seedsService, activityService) {
  var activity = this;

  activity.seedsService = seedsService;
  activity.activityService = activityService;

};
