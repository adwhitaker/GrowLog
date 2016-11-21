angular.module('growLogApp')
       .controller('OtherController', OtherController);

function OtherController($http) {
  var other = this;
  console.log('OtherController loaded');

  other.addTask = function(task) {
    var title = task.title;
    var comments = task.comments;
    var data = {title: title, comments: comments
    };

    $http.post('/activity', data);
    // empty form after clicking 'Add task'
    other.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
