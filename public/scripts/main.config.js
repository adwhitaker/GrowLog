angular.module('growLogApp')
       .config(configVeggies);

function configVeggies($routerProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routerProvider.when('/', {
    templateUrl:'views/home.html'
  }).when('/seeds', {
    templateUrl: 'views/seeds.html'
  }).when('/activity', {
    templateUrl: 'views/activity.html'
  }).otherwise();
};
