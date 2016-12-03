angular.module('growLogApp')
       .controller('IssueFormController', IssueFormController);

function IssueFormController(locationService, activityService, $mdDialog) {
  var issueForm = this;

  issueForm.locations = locationService;

  issueForm.showAlert = function() {
    $mdDialog.show(
      $mdDialog.alert()
      .parent(angular.element(document.querySelector('#popupContainer')))
      .clickOutsideToClose(true)
      .title('Success!')
      .textContent('You have reported an issue.')
      .ariaLabel('Alert Success')
      .ok('Confirm')
    );
  };

  issueForm.addTask = function (task) {

    var data = {
      location_id: task.location.id,
      type: 'issues',
      assigndate: moment().format('L'),
      title: task.title,
      comments: task.comments
    };

    activityService.addActivity(data)
    .then(function () {
      issueForm.showAlert();
      issueForm.task = '';
    }).catch(function (err) {
      console.log('Error posting request', error);
    });
  };

}
