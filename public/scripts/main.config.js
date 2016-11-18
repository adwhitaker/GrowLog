angular.module('growLogApp')
       .config(configVeggies);

function configVeggies($routerProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routerProvider.when('/home', {
    templateUrl:'views/home.html'
  }).when('/seeds', {
    templateUrl: 'views/seeds.html'
  }).when('/activity', {
    templateUrl: 'views/activity.html'
  }).when('/plant', {
    templateUrl: 'views/plant.html'
  }).when('/inputs', {
    templateUrl: 'views/inputs.html'
  }).when('/weed', {
    templateUrl: 'views/weed.html'
  }).when('/harvest', {
    templateUrl: 'views/harvest.html'
  }).when('issues', {
    templateUrl: 'views/issues.html'
  }).when('/other', {
    templateUrl: 'views/other.html'
  }).when('/', {
    templateUrl: 'views/login.html'
  }).when('/generatereport', {
    templateUrl: 'views/generatereport.html'
  }).otherwise();
};
