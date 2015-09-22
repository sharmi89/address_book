angular.module('UserApp', ['userService'])
    .controller('UserAppController', function($scope, $http, $route, $location, User, Session) {

        $scope.student = [];
        $scope.loading = false;

        $scope.authenticate = function(e) {
            e.preventDefault();
            var user = {
                email: $scope.user.email,
                password: $scope.user.password,
            };
            // check user authentication
            User.authenticate(user)
                .success(function(response) {
                    notify('success', response.msg);
                    Session.create(response.id, response.name);
                    $location.path("/students");
                }).error(function(data, status, headers, config) {
                    console.log('error');
                });
        };

        // Register a user
        $scope.register = function(e) {
            e.preventDefault();
            var userDate = {
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                password_confirmation: $scope.user.password_confirmation
            };
            // call save function
            User.register(userDate)
                .success(function(response) {
                    notify('success', response.msg);
                    $location.path("/students");
                }).error(function(data, status, headers, config) {
                    angular.forEach(data, function(value, key) {
                        var firstElement = Object.keys(data)[0];
                        var element = document.getElementById(firstElement).focus();
                        notify('danger', value);
                    });
                });
        };
    });
