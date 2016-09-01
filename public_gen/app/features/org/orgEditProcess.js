define([
  'angular',
  'lodash',
],
function (angular) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('OrgEditProcess', function($http,$scope, $routeParams, backendSrv, $location,contextSrv) {

     $scope.init = function() {
        $scope.getProcess($routeParams.processId);


    };

    $scope.getProcess = function(processId) {
          backendSrv.get('/api/org/process/edit/' + processId).then(function(process) {
            $scope.process = process;
           $scope.process_id = processId;


          });
        };




      $scope.update = function() {
           if (!$scope.updateForm.$valid) { return; }

           backendSrv.patch('/api/org/process/' + $scope.process_id, $scope.process).then(function() {
             $location.path('/org/process');
           });
         };

    $scope.init();

  });
});
