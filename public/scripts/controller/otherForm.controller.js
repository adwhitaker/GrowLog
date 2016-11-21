angular.module('growLogApp')
       .controller('OtherFormController', OtherFormController);

function OtherFormController($http) {
  var otherForm = this;
  console.log('OtherFormController loaded');

  otherForm.addTask = function(task) {
    console.log('task', task);
    var title = task.title;
    var comments = task.comments;
    var data = {title: title, comments: comments
    };
    // empty form after clicking 'Add task'
    otherForm.task = '';
  };
}
