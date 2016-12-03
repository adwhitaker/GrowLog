angular.module('growLogApp')
       .controller('NewLocationFormController', NewLocationFormController);

function NewLocationFormController($http, locationService, $mdDialog) {
  var locationForm = this;

  locationForm.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Success!')
      .textContent('You have added a location.')
      .ariaLabel('Alert Success')
      .ok('Confirm')
    );
  };

  // add new location to the DB
  locationForm.addLocation = function (location) {

    let data = {
      field: location.field,
      section: location.section,
      row: location.row
    };

    locationService.addLocation(data)
                   .then(function () {
                      locationForm.showAlert();
                      locationForm.location = '';
                    })
                   .catch(function () {
                      console.log('error posting request', error);
                    });
  };
};
