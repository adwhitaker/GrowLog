angular.module('growLogApp')
       .controller('OtherFormController', OtherFormController);

function OtherFormController($http, locationService, activityService) {
  var otherForm = this;

  otherForm.locationService = locationService;

  // adding new "other" activity to DB
  otherForm.addTask = function (task) {
    // let id = task.id;

    let data = {
      location_id: task.location.id,
      type: 'other',
      assigndate: moment().format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.addActivity(data)
    .then(function () {
      otherForm.task = '';
    }).catch(function (error) {
      console.log('Error posting request', error);
    });
  };
};
