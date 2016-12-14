angular.module('growLogApp')
       .controller('OtherFormController', OtherFormController);

function OtherFormController(locationService, activityService, $mdDialog) {
  var otherForm = this;

  otherForm.locationService = locationService;

  otherForm.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Success!')
      .textContent('You have added an activity.')
      .ariaLabel('Alert Success')
      .ok('Confirm')
    );
  };

  // adding new "other" activity to DB
  otherForm.addTask = function (task) {
    let data = {
      location_id: task.location.id,
      type: 'other',
      assigndate: moment().format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.addActivity(data)
    .then(function () {
      otherForm.showAlert();
      otherForm.task = '';
    }).catch(function (error) {
      console.log('Error posting request', error);
    });
  };
};
