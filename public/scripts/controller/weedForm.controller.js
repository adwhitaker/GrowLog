angular.module('growLogApp')
       .controller('WeedFormController', WeedFormController);

function WeedFormController(locationService) {
  var weedForm = this;

    locationService.getLocations().then(function (response) {
      weedForm.locations = response;
      console.log(response);
    });

    weedForm.addActivity = function (location, date) {
      //need to redo this
      console.log(location);
      console.log(date);

      weedForm.activity = '';
    };

}
