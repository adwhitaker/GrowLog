angular.module('growLogApp')
       .controller('OtherFormController', OtherFormController);

function OtherFormController($http, locationService) {
  var otherForm = this;
  console.log('OtherFormController loaded');

  locationService.getLocations().then(function(response) {
    otherForm.locations = response;
    console.log(response);
  });

  otherForm.addTask = function(task) {
    console.log('task', task);
    var location_id = task.location.id;
    var assigndate = moment(task.date).format('L');
    var title = task.title;
    var comments = task.comments;
    var data = {location_id: location_id, type: 'other', assigndate: assigndate, title: title, comments: comments
    };
    $http.post('/activity', data);

    // empty form after clicking 'Add task'
    otherForm.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
