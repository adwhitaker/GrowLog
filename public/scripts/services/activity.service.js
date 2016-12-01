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
          activitiesObject[newActivity.type + 'Complete'].forEach(function (currentActivity) {
            currentActivity.assigndate = moment(currentActivity.assigndate).format('L');
            currentActivity.completedate = moment(currentActivity.completedate).format('L');
          });
        } else {
          activitiesObject[newActivity.type].push(newActivity);
          activitiesObject[newActivity.type].forEach(function (currentActivity) {
            currentActivity.assigndate = moment(currentActivity.assigndate).format('L');
            currentActivity.checkstatus = 'check_box_outline_blank';
          });
        }
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
  activity.deleteActivity = function (activityId, joinsId) {

    return $http.delete('/activity/' + activityId, { params: { joinsID: joinsId } })
    .then(function (response) {
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
