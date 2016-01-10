angular.module('userService', [])

.factory('User', function($q, $http, $location, Session) {

    return {

        // check the user already authenticated
        authenticate: function() {
            var deferred = $q.defer();
            
            if(Session.userId){
                deferred.resolve(Session.userId);
            } else {
                return $http.get('user/currentUser').success(function(response) {
                    Session.create(response.id, response.name);
                    deferred.resolve(response);
                })
                .error(function(response) {
                    $location.path("/login");
                    notify('danger', response.msg);
                    deferred.reject(response);
                });
            }

            return deferred.promise;
            
        },

        // check the user have authentication
        login: function(user) {
            var deferred = $q.defer();

            $http.post('auth/login', user).success(function(response){
                Session.create(response.id, response.name);
                deferred.resolve(response);
            })
            .error(function(response){
                deferred.reject(response);
            });

            return deferred.promise;
        },

        // register a user
        register: function(user) {
            return $http.post('auth/register', user);
        },

        // Log out the current user
        logout: function(e) {
            return $http.get('auth/logout').success(function(response) {
                Session.destroy();
                $location.path("/login");
            });
        }
    }

})

.service('Session', function() {
    this.create = function(userId, userName) {
        this.id = userId;
        this.userId = userName;
    };
    this.destroy = function() {
        this.id = null;
        this.userId = null;
    };
});
