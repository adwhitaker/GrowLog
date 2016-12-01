angular.module('growLogApp')
       .controller('WeedFormController', WeedFormController);

function WeedFormController($http, locationService, activityService) {
  var weedForm = this;

  weedForm.locationService = locationService;

  // add a weeding activity to the DB
  weedForm.addActivity = function (activity) {

    let data = {
      location_id: activity.location.id,
      type: 'weed',
      assigndate: moment().format('L'),
      weedtype: activity.weedtype,
      comments: activity.comments
    };

    activityService.addActivity(data)
    .then(function () {
      weedForm.activity = '';
    }).catch(function (error) {
      console.log('Error posting request', error);
    });
  };
};
