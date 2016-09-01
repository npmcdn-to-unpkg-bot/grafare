define([
  'angular',
  'lodash',
],
function (angular, _) {
  'use strict';

  var module = angular.module('grafana.controllers');

  module.controller('UserInviteCtrl', function($scope, $routeParams,backendSrv) {

    $scope.invites = [
      {name: '', email: '', role: 'Editor'},
    ];
    $scope.process = [
          {processName: '', parentProcessName: '', updatedBy: ''},
        ];
        $scope.machines = [
                  {machineName: '', description: '', updatedBy: '',vendor:''},
                ];
         $scope.maintenances = [
                           {component: '', parameter: '', message: '', interval: ''},
                         ];

    $scope.options = {skipEmails: false};
    $scope.init = function() {
     if ($routeParams.processId) {
            $scope.getProcess($routeParams.processId);

          }

    };

 $scope.getProcess = function() {
      backendSrv.get('/api/org/process/' ).then(function(process) {
        $scope.process = process;

      });
    };

    $scope.addInvite = function() {
      $scope.invites.push({name: '', email: '', role: 'Editor'});
    };
    $scope.addProcess = function() {
          $scope.process.push({processName: '', parentProcessName: '', updatedBy: ''});
        };
        $scope.addMachine = function() {
                  $scope.machines.push({machineName: '', description: '', updatedBy: '',vendor:''});
                };
     $scope.addMaintenance = function() {
                       $scope.maintenances.push({machineId: '', instruction: '', component: ''});
                     };
    $scope.removeInvite = function(invite) {
      $scope.invites = _.without($scope.invites, invite);
    };

    $scope.sendInvites = function() {
      if (!$scope.inviteForm.$valid) { return; }
      $scope.sendSingleInvite(0);
    };
    $scope.sendSingleInvite = function(index) {
      var invite = $scope.invites[index];
      invite.skipEmails = $scope.options.skipEmails;

      return backendSrv.post('/api/org/invites', invite).finally(function() {
        index += 1;

        if (index === $scope.invites.length) {
          $scope.invitesSent();
          $scope.dismiss();
        } else {
          $scope.sendSingleInvite(index);
        }
      });

     };

      $scope.sendProcess = function(p) {
      if (!$scope.processForm.$valid) { return; }
      $scope.sendSingleInvite1(0);
      };
     $scope.sendSingleInvite1 = function(index1) {
      var process = $scope.process[index1];
      process.skipEmails = $scope.options.skipEmails;

      return backendSrv.post('/api/org/process', process).finally(function() {
        $location.path('/org/process');
        index += 1;

        if (index === $scope.process.length) {

          $scope.dismiss();
        } else {
          $scope.sendSingleInvite1(index1);
        }
      });

    };
      $scope.sendMachine = function() {
           if (!$scope.machineForm.$valid) { return; }
           $scope.sendSingleInvite2(0);
           };
          $scope.sendSingleInvite2 = function(index2) {
           var machines = $scope.machines[index2];
           machines.skipEmails = $scope.options.skipEmails;

           return backendSrv.post('/api/org/machine', machines).finally(function() {
             index += 1;

             if (index === $scope.machines.length) {
               $scope.processSent();
               $scope.dismiss();
             } else {
               $scope.sendSingleInvite2(index2);
             }
           });

         };



$scope.sendMaintenance = function() {
           if (!$scope.maintenanceForm.$valid) { return; }
           $scope.sendSingleInvite3(0);
           };
          $scope.sendSingleInvite3 = function(index3) {
           var maintenances = $scope.maintenances[index3];
           maintenances.skipEmails = $scope.options.skipEmails;

           return backendSrv.post('/api/org/maintenance', maintenances).finally(function() {
             index += 1;

             if (index === $scope.maintenances.length) {
               $scope.maintenanceSent();
               $scope.dismiss();
             } else {
               $scope.sendSingleInvite3(index3);
             }
           });

         };

$scope.sendUpdate = function() {
           if (!$scope.updateForm.$valid) { return; }
           $scope.sendSingleInvite4(0);
           };
          $scope.sendSingleInvite4 = function(index4) {
           var process = $scope.process[index4];
           process.skipEmails = $scope.options.skipEmails;

             backendSrv.put('/api/org/process/' + process.processId,process).finally(function() {
             index += 1;

             if (index === $scope.process.length) {
               $scope.processSent();
               $scope.dismiss();
             } else {
               $scope.sendSingleInvite4(index4);
             }
           });

         };





  });
});
