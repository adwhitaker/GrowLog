angular.module('growLogApp')
       .controller('WeedFormController', WeedFormController);

function WeedFormController(locationService, activityService, $mdDialog) {
  var weedForm = this;

  weedForm.locationService = locationService;

  weedForm.showAlert = function () {
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

  // add a weeding activity to the DB
  weedForm.addActivity = function (activity) {

    let data = {
      location_id: activity.location.id,
      type: 'weed',
      assigndate: moment().format('L'),
      weedtype: activity.weedtype,
      comments: activity.comments,
    };

    activityService.addActivity(data)
    .then(function () {
      weedForm.showAlert();
      weedForm.activity = '';
    }).catch(function (error) {
      console.log('Error posting request', error);
    });
  };
};
