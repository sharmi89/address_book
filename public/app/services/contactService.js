angular.module('contactService', [])

.factory('Contact', function($http) {

    return {
        // get the contacts
        search: function(searchKey) {
            return $http.post('contact/search' ,{
                searchKey: searchKey,
            });
        },

        // save a contact
        save: function(contact) {
            return $http.post('contact', contact);
        },

        // edit a contact
        edit: function(id) {
            return $http.get('contact/' + id + '/edit');
        },

        // update a contact
        update: function(contact) {
            return $http.put('contact', contact);
        },

        // delete a contact
        delete: function(id) {
            return $http.delete('contact/' + id);
        }
    }

});
