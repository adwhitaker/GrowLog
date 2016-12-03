angular.module('growLogApp')
       .controller('WaterFormController', WaterFormController);

function WaterFormController($http, locationService, $mdDialog) {
  var waterForm = this;

  waterForm.locationService = locationService;

  waterForm.showAlert = function() {
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

  waterForm.addActivity = function (activity) {

    let data = {
      location_id: activity.location.id,
      type: 'water',
      assigndate: moment().format('L'),
      comments: activity.comments
    };

    $http.post('/activity', data)
         .then(function () {
            waterForm.showAlert();
            waterForm.activity = '';
          }).catch(function () {
            console.log('Error posting request', error);
          });
  };
};
