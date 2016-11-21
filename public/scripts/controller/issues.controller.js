angular.module('growLogApp')
       .controller('IssuesController', IssuesController);

function IssuesController() {
  var issues = this;
  console.log('IssuesController loaded');
}
