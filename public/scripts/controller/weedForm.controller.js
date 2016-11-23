angular.module('growLogApp')
       .controller('WeedFormController', WeedFormController);

function WeedFormController(locationService) {
  var weedForm = this;

    locationService.getLocations().then(function (response) {
      weedForm.locations = response;
      console.log(response);
    });

    weedForm.addActivity = function (activity) {
      var location = activity.location_id;
      var assigndate = activity.date;
      var data = {location: location, type: 'weed', assigndate: assigndate
      };
      $http.post('/activity', data);

      weedForm.activity = '';
    }, function(serror) {
      console.log('Error posting request', error);
    };
  }
