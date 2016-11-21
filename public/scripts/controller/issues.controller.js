angular.module('growLogApp')
       .controller('IssuesController', IssuesController);

function IssuesController() {
  var issues = this;
  console.log('IssuesController loaded');

  issues.addTask = function(task) {
    var date = issues.date;
    var title = issues.title;
    var comments = issues.comment;
    var data = {date: date, title: title; comments: comments;
    }
    $http.post('/activity', data);
    // empty form after clicking 'Add task'
    issues.task = '';
  }, function(error) {
    console.log('Error posting request', error);
  };
}
