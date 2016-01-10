angular.module('ContactApp', ['contactService'])
    .controller('ContactAppController', function($scope, $http, $route, $location, Contact) {

        $scope.contact = [];
        $scope.loading = false;
        
        // initial fuctions call
        $scope.$on(
            "$routeChangeSuccess",
            function($currentRoute) {
                // call initial functions
                if (path = $route.current.originalPath) {
                    switch (path) {
                        case '/contacts':
                            getContacts();
                            break;
                        case '/contact/:id/edit':
                            getContact($route.current.params.id);
                            break;
                        default:

                    }
                }
            }
        );

        // search contacts
        $scope.$watch('filterKey', function(newValue, oldValue) {
            if (!oldValue) {
                return false;
            }
            $scope.loading = true;
            Contact.search(newValue)
                .success(function(data, status, headers, config) {
                    $scope.contacts = data;
                    if(data.length == 0){
                      $scope.selectedContact = {};
                    }
                    $scope.loading = false;
                });
        });

        // Set contact to detials view panel
        $scope.selectContact = function(contact) {
            $scope.selectedContact = contact;
        }

        // check given is the selectedContact
        $scope.isSelectedContact = function(contact) {
            return $scope.selectedContact === contact;
        }

        // get all contacts
        function getContacts() {
            $scope.loading = true;
            Contact.search()
                .success(function(data) {
                    $scope.contacts = data;
                    $scope.loading = false;
                })
                .error(function(response) {
                    notify('danger', response);
                });
        }

        // get a contact by id
        function getContact(id) {
            $scope.loading = true;
            Contact.edit(id)
                .success(function(data, status, headers, config) {
                    $scope.loading = false;
                    $scope.contact = data;
                })
                .error(function(response) {
                    $scope.loading = false;
                    notify('danger', response);
                });
        }

        // delete a contact
        $scope.delete = function(id) {
            bootbox.confirm("Are you sure to delete this Contact?", function(result) {
                if (result) {
                    $scope.loading = true;
                    Contact.delete(id)
                        .success(function(respopnse) {
                            notify('success', respopnse.msg);
                            // get all contacts
                            Contact.search()
                                .success(function(data) {
                                    $scope.contacts = data;
                                    $scope.loading = false;
                                })
                        });
                }
            });
        };

        // save new Contact
        $scope.saveContact = function(e) {
            e.preventDefault();
            var contact = $scope.contact;
            var contactData = {
                firstName: contact.firstName,
                lastName: contact.lastName,
                nicNo: contact.nicNo,
                mobileNo: contact.mobileNo,
                fixedlineNo: contact.fixedlineNo,
                dateOfBirth: contact.dateOfBirth,
                address: contact.address
            };
            // call update function
            if ($scope.contact.id) {
                Contact.update($scope.contact)
                    .success(function(response) {
                        notify('success', response.msg);
                        $location.path("/contacts");
                    }).error(function(data, status, headers, config) {
                        angular.forEach(data, function(value, key) {
                            var firstElement = Object.keys(data)[0];
                            var element = document.getElementById(firstElement).focus();
                            notify('danger', value);
                        });
                    });
            } else {
                // call save function
                Contact.save(contactData)
                    .success(function(response) {
                        notify('success', response.msg);
                        $location.path("/contacts");
                    }).error(function(data, status, headers, config) {
                        angular.forEach(data, function(value, key) {
                            var firstElement = Object.keys(data)[0];
                            var element = document.getElementById(firstElement).focus();
                            notify('danger', value);
                        });
                    });
            }
        };

    });
