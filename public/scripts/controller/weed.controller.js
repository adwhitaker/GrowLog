angular.module('growLogApp')
       .controller('WeedController', WeedController);

function WeedController() {
  var weed = this;
  console.log('WeedController loaded');
}
