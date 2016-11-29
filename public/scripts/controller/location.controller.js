angular.module('growLogApp')
    .controller('LocationController', LocationController);



function LocationController(locationService, $route) {
    var loc = this;
    loc.locations = [];

    loc.refresh = function () {
      $route.reload();
    };
            locationService.getLocations().then(function(response) {
              console.log('response', response);
                loc.locations = response;
                console.log("loc.locations", loc.locations);
                // empty form after clicking 'submit'
                //location.location = '';
            });

        loc.updateLocation = function(id, field, section, row) {
          data = {field:field, section:section, row:row};
          console.log(data);
                locationService.updateLocation(id, data).then(function(response) {
                  console.log('response', response);
                    // empty form after clicking 'submit'
                    //location.location = '';
                });
            } //location put

            loc.deleteLocation = function(id) {
              console.log("id", id);

                    locationService.deleteLocation(id).then(function(response) {
                      console.log('response', response);

                    });
                } //location delete controller
} //end location controller
