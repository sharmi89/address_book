var app = angular.module('App', ['UserApp', 'ContactApp', 'ngRoute'])
    .controller('AppController', function($scope, User) {

        // Log out current user
        $scope.logout = User.logout;
    })
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    })
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/login', {
                templateUrl: 'views/user/login.html',
                controller: 'UserAppController'
            }).when('/register', {
                templateUrl: 'views/user/register.html',
                controller: 'UserAppController'
            }).when('/contacts', {
                templateUrl: 'views/contact/list.html',
                controller: 'ContactAppController',
                resolve: {
                    authenticated: function($q, User){
                        return User.authenticate().then(null, function(response){
                            return $q.reject();
                        });
                    }
                }
            }).when('/contact', {
                templateUrl: 'views/contact/form.html',
                controller: 'ContactAppController',
                resolve: {
                    authenticated: function($q, User){
                        return User.authenticate().then(null, function(response){
                            return $q.reject();
                        });
                    }
                }
            }).when('/contact/:id/edit', {
                templateUrl: 'views/contact/form.html',
                controller: 'ContactAppController',
                resolve: {
                    authenticated: function($q, User){
                        return User.authenticate().then(null, function(response){
                            return $q.reject();
                        });
                    }
                }
            }).otherwise({
                redirectTo: '/contacts'
            });
        }
    ]);
