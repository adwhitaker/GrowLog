angular.module('growLogApp')
       .service('activityService', activityService);

function activityService($http) {

  var activity = this;

  // activities are returned from the DB and stored here
  var activitiesObject = {
    activity: []
  };

  activity.activitiesObject = activitiesObject;

  // get activities from DB
  activity.getActivities = function () {
    return $http.get('/activity').then(function (response) {
      activitiesObject.activity = response.data;
      return;
    }).catch(function (err) {
      console.log('err', err);
    });

  };

  // initial get all activities from DB
  activity.getActivities();
};
