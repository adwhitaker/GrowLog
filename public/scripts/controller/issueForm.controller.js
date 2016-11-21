angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController($http) {
  var issueForm = this;
  console.log('IssueFormController loaded');
  issueForm.addTask = function(task) {
    var type = issue;
    var assigndate = issueForm.date;
    var title = issueForm.title;
    var comments = issueForm.comment;
    var data = {type: type, assigndate: date, title: title, comments: comments
    };
    $http.post('/activity', data);
    // empty form after clicking 'Add task'
    issues.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };

}
