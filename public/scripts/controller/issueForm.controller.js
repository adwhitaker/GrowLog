angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController($http) {
  var issueForm = this;
  console.log('IssueFormController loaded');
  issueForm.addTask = function(task) {
    console.log('task', task);
    var assigndate = task.date;
    var title = task.title;
    var comments = task.comment;
    var data = {assigndate: date, title: title, comments: comments
    };
    $http.post('/activity', data);

    issueForm.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
