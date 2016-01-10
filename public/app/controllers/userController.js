angular.module('UserApp', ['userService'])
    .controller('UserAppController', function($scope, $http, $route, $location, User, Session) {

        $scope.loading = false;

        $scope.login = function(e) {
            e.preventDefault();
            
            var user = {
                email: $scope.user.email,
                password: $scope.user.password,
            };

            // check user authentication
            User.login(user).then(function(){
                $location.path("/contacts");
            }, function(data){
                notify('danger', data.msg);
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
                    $location.path("/");
                })
                .error(function(data, status, headers, config) {
                    angular.forEach(data, function(value, key) {
                        var firstElement = Object.keys(data)[0];
                        var element = document.getElementById(firstElement).focus();
                        notify('danger', value);
                    });
                });
        };
    });
