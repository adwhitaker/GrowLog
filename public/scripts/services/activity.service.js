angular.module('growLogApp')
       .service('activityService', activityService);

function activityService($http) {

  var activity = this;

  // activities are returned from the DB and stored here
  var activitiesObject = {
    allActivities: [],
    issues: [],
    issuesComplete: [],
    water: [],
    waterComplete: [],
    other: [],
    otherComplete: []
  };

  activity.activitiesObject = activitiesObject;

  // get activities from DB
  activity.getActivities = function () {


    return $http.get('/activity').then(function (response) {
      let allActivities = response.data;

      activity.activitiesObject.allActivities = [];
      activity.activitiesObject.issues = [];
      activity.activitiesObject.issuesComplete = [];
      activity.activitiesObject.water = [];
      activity.activitiesObject.waterComplete = [];
      activity.activitiesObject.other = [];
      activity.activitiesObject.otherComplete = [];

      allActivities.forEach(function (newActivity) {
        if (newActivity.completedate) {
          activitiesObject[newActivity.type + 'Complete'].push(newActivity);
        } else {
          activitiesObject[newActivity.type].push(newActivity);
        };
      });

      return;
    }).catch(function (err) {
      console.log('err', err);
    });

  };

  // initial get all activities from DB
  activity.getActivities();
};
