angular.module('growLogApp')
       .config(configVeggies);

function configVeggies($routerProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routerProvider.when().otherwise();
};
