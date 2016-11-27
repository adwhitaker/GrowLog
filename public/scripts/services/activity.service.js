angular.module('growLogApp')
       .service('activityService', activityService);

function activityService($http) {

  var activity = this;

  // activities are returned from the DB and stored here
  var activitiesObject = {
    issues: [],
    issuesComplete: [],
    water: [],
    waterComplete: [],
    weed: [],
    weedComplete: [],
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
      activity.activitiesObject.weed = [];
      activity.activitiesObject.weedComplete = [];

      allActivities.forEach(function (newActivity) {
        if (newActivity.completedate) {
          activitiesObject[newActivity.type + 'Complete'].push(newActivity);
        } else {
          activitiesObject[newActivity.type].push(newActivity);
        };
      });

      return;
    }).catch(function (err) {
      console.log('Error Getting Tasks', err);
    });

  };

  // adds an activity in the DB
  activity.addActivity = function (newActivityInfo) {
    return $http.post('/activity', newActivityInfo).then(function (response) {
      activity.getActivities();
      return;
    }).catch(function (err) {
      console.log('Error Getting Tasks', err);
    });
  };

  // updates the activity in the DB
  activity.updateActivity = function (id, updatedActivityInfo) {
    return $http.put('/activity/' + id, updatedActivityInfo).then(function (response) {
      activity.getActivities();
      return;
    }).catch(function (err) {
      console.log('Error Getting Tasks', err);
    });
  };

  // deletes activity in the DB
  activity.deleteActivity = function (data) {
    console.log('data', data);
    return $http.delete('/activity/' + data.id, data).then(function (response) {
      console.log('response', response);
      activity.getActivities();
      return;
    }).catch(function (err) {
      console.log('Error Getting Tasks', err);
    });
  };

  // initial get all activities from DB
  activity.getActivities();
};
