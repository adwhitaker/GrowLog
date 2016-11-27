angular.module('growLogApp')
    .controller('LocationController', LocationController);



function LocationController(locationService) {
    var loc = this;
    loc.locationArray = [];
    console.log('LocationController loaded');
            locationService.getLocations().then(function(response) {
              console.log('response', response);
                loc.locationArray = response;
                console.log("loc.locationarray", loc.locationArray);
                // empty form after clicking 'submit'
                //location.location = '';
            });

        loc.updateLocation = function(id, field, section, row) {
          console.log('field', field);
          loc.data = {id:id, field:field, section:section, row:row};
          console.log(loc.data);
                locationService.updateLocation(loc.data).then(function(response) {
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
