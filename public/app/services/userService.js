angular.module('userService', [])

.factory('User', function($http, $location, Session) {

    return {

        // check the user have authentication
        authenticate: function(user) {
            return $http.post('auth/login', user);
        },

        // register a user
        register: function(user) {
            return $http.post('auth/register', user);
        },

        // Log out the current user
        logout: function logout(e) {
            return $http.get('auth/logout').success(function(response) {
                Session.destroy();
                $location.path("/login");
            });
        },
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
