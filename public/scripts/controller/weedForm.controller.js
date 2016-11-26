angular.module('growLogApp')
       .controller('WeedFormController', WeedFormController);

function WeedFormController($http, locationService, activityService) {
  var weedForm = this;

    locationService.getLocations().then(function (response) {
      weedForm.locations = response;
      console.log(response);
    });



    weedForm.addActivity = function (activity) {
console.log("activity", activity);
var location_id = activity.location.id;
console.log("id", location_id);
var field = activity.location.field;
console.log("field", field);

var section = activity.location.section;
console.log("section", section);

var row = activity.location.row;
console.log("row", row);

var comments = activity.comments;
console.log("comments", comments);

var weedtype = activity.weedtype;


var assigndate = moment(activity.date).format('L');

var data = {location_id: location_id, type: 'weed',  assigndate: assigndate, weedtype:weedtype, comments: comments}
      $http.post('/activity', data);

      weedForm.activity = '';
    }, function(serror) {
      console.log('Error posting request', error);
    };
  }
