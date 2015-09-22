var app = angular.module('App', ['UserApp', 'ContactApp', 'ngRoute', 'ui.bootstrap', 'ngAnimate'])
    .controller('AppController', function($scope, Session, User) {
        $scope.isAuthenticate = true;
        // console.log(Session);

        // Log out current user
        $scope.logout = User.logout;
    })
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
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
                controller: 'ContactAppController'
            }).when('/contact', {
                templateUrl: 'views/contact/form.html',
                controller: 'ContactAppController',
            }).when('/contact/:id/edit', {
                templateUrl: 'views/contact/form.html',
                controller: 'ContactAppController',
            }).otherwise({
                redirectTo: '/contacts'
            });
        }
    ])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    })
    .run(function($rootScope, $location, Session, $http) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            // check user already authenticated
            if (Session.userId == null && next.templateUrl !== 'views/user/login.html' && next.templateUrl !== 'views/user/register.html') {
                $http.get('user/currentUser')
                    .success(function(response) {
                        Session.create(response.id, response.name);
                    }).error(function(data, status, headers, config) {
                        notify('danger', data.msg);
                        $location.path("/login");
                    });
            }
        });
    });
