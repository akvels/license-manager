'use strict';

angular.module('mean.license-manager').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('licenseManager example page', {
      url: '/licenseManager/example',
      templateUrl: 'license-manager/views/index.html'
    });
  }
]);
