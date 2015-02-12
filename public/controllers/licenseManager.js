'use strict';

/* jshint -W098 */
angular.module('mean.license-manager').controller('LicenseManagerController', ['$scope', 'Global', 'LicenseManager',
  function($scope, Global, LicenseManager) {
    $scope.global = Global;
    $scope.package = {
      name: 'license-manager'
    };
  }
]).controller("createLicense",['$scope', 'Global', 'LicenseManager',
    function ($scope, Global, LicenseManager){
        $scope.addLicense = function(){
            $http.post('/addLicense', {
                email: $scope.user.email,
                mobileNo:$scope.user.mobilNo,
                password: $scope.user.password,
                username: $scope.user.username,
                licenseType:$scope.user.licenseType,
                startData:$scope.user.startDate,
                endDate:$scope.user.startDate,
                name: $scope.user.name
            }).success(function() {
                    // authentication OK
                    $scope.registerError = 0;
                    $rootScope.user = $scope.user;
                    Global.user = $rootScope.user;
                    Global.authenticated = !! $rootScope.user;
                    $rootScope.$emit('loggedin');
                    $location.url('/');
                }).error(function(error) {
                // Error: authentication failed
                if (error === 'Not able to create License for this user') {
                    $scope.usernameError = error;
                } else if (error === 'Email already taken') {
                    $scope.emailError = error;
                } else $scope.registerError = error;
            });
        }
        $scope.validateLicense = function(){
            $http.post('/validateLicense', {
                userName: $scope.user.name,
                licenseKey: $scope.user.lienceKey
            }).success(function() {
                // authentication OK
                $scope.licenseStatus = 0;
                $rootScope.$emit('loggedin');
                $location.url('/');
            }).error(function(error) {
                if (error === 'Not a valid license for this user',$scope.user.name) {
                    $scope.usernameError = error;
                } else $scope.registerError = error;
            });
        }
    }
]);
