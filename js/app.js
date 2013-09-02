'use strict';

var demoTask = angular.module('demoTask', []);

demoTask.config(function($routeProvider) {

  $routeProvider.
  when('/', {
    controller: 'ChooseModeController',
    templateUrl: 'view/tableIndex.html'
  }).
  when('/large', {
    controller: 'LargeModeController',
    templateUrl: 'view/table.html'
  }).
  when('/normal', {
    controller: 'NormalModeController',
    templateUrl: 'view/table.html'
  });
});