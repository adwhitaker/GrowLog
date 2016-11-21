angular.module('growLogApp')
       .config(configVeggies);

function configVeggies($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController as home',
  }).when('/seeds', {
    templateUrl: 'views/seeds.html',
    controller: 'SeedsController as seeds',
  }).when('/activity', {
    templateUrl: 'views/activity.html',
    controller: 'ActivityController as activity',
  }).when('/plant', {
    templateUrl: 'views/plant.html',
    controller: 'PlantController as plant',
  }).when('/water', {
    templateUrl: 'views/water.html',
    controller: 'WaterController as water',
  }).when('/weed', {
    templateUrl: 'views/weed.html',
    controller: 'WeedController as weed',
  }).when('/harvest', {
    templateUrl: 'views/harvest.html',
    controller: 'HarvestController as harvest',
  }).when('/issues', {
    templateUrl: 'views/issues.html',
    controller: 'IssuesController as issues',
  }).when('/other', {
    templateUrl: 'views/other.html',
    controller: 'OtherController as other',
  }).when('/', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login',
  }).when('/generatereport', {
    templateUrl: 'views/generatereport.html',
    controller: 'ReportController as report',
  }).when('/newSeedForm', {
    templateUrl: 'views/newSeedForm.html',
    controller: 'NewSeedFormController as newSeed',
  }).when('/plantTaskForm', {
    templateUrl: 'views/plantForm.html',
    controller: 'PlantFormController as plantForm',
  }).when('/waterForm', {
    templateUrl: 'views/waterForm.html',
    controller: 'WaterFormController as waterForm'
  });

  $locationProvider.html5Mode(true);
}
