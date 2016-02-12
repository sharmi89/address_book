'use strict';

describe('ContactApp Module', function() {

	var session, event, routeChangeEvent;
    var $httpBackend, $rootScope, $route, $location, contactController, contactService;

    beforeEach(module('contactService'));
	beforeEach(module('ContactApp'));
    beforeEach(module('ngRoute'));

    beforeEach(inject(function($injector) {
        
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');
        
        contactService = $injector.get('Contact');

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $route = $injector.get('$route');

        contactController = $controller('ContactAppController', {'$scope': $rootScope, '$route': $route});

        // Some dummy functions, which are used from some other libraries
        event = {
            preventDefault: function () {}
        };
        window.notify = jasmine.createSpy();
        document.getElementById = function(){
            return {
                focus: function() {}
            };
        };
        routeChangeEvent = function($path) {
            return {
                $$route: {
                    originalPath: $path
                },
                pathParams: {
                    id: 1
                } 
            };
        }
    }));

    describe('Contact controller', function(){

        it('Should get all contacts initially', function(){

            $httpBackend.expectPOST('contact/search').respond(200, [{id: "1", salutation: null, firstName: "first name", lastName: "last name"}]);
            $rootScope.$broadcast('$routeChangeSuccess', routeChangeEvent('/contacts'));
            $httpBackend.flush();
            expect($rootScope.contacts.length).toEqual(1);
            expect($rootScope.loading).toBeFalsy();
        });

        it('Should be add new contact', function(){
            $rootScope.contactData = {
                firstName: 'first name',
                lastName: 'last name',
                nicNo: '11111111111',
                mobileNo: '22222222',
            };

            $httpBackend.expectPOST('contact').respond(200, {});
            $rootScope.saveContact(event);
            $httpBackend.flush();

            $httpBackend.expectPOST('contact/search').respond(200, [{id: "1", salutation: null, firstName: "first name", lastName: "last name"}]);
            $rootScope.$broadcast('$routeChangeSuccess', routeChangeEvent($location.$$path));
            $httpBackend.flush();
            expect($location.$$path).toBe('/contacts');
            expect($rootScope.contacts.length).toEqual(1);
            expect($rootScope.loading).toBeFalsy();
        });

        it('Should be update contact', function(){

            var id = "1";
            $httpBackend.expectGET('contact/' + id + '/edit').respond(200, {id: "1", salutation: null, firstName: 'first name', lastName: 'last name', nicNo: '11111111111',});
            $rootScope.$broadcast('$routeChangeSuccess', routeChangeEvent('/contact/:id/edit'));
            $httpBackend.flush();
            expect($rootScope.contact.id).toEqual(id);

            // Updateing the contact details
            $rootScope.contact.firstName = 'first name updated'

            $httpBackend.expectPUT('contact').respond(200, {});
            $rootScope.saveContact(event);
            $httpBackend.flush();

            $httpBackend.expectPOST('contact/search').respond(200, [{id: "1", salutation: null, firstName: "first name updated", lastName: "tesed third"}]);
            $rootScope.$broadcast('$routeChangeSuccess', routeChangeEvent($location.$$path));
            $httpBackend.flush();
            expect($location.$$path).toBe('/contacts');
            expect($rootScope.contacts[0].firstName).toEqual("first name updated");
            expect($rootScope.loading).toBeFalsy();
        });

        it('Should search contacts', function(){
            var searchKey = 'na';
            $httpBackend.expectPOST('contact/search').respond(200, {0: {id: "1", salutation: null, firstName: "first name", lastName: "last name"}});
            $rootScope.$apply(function(){
                $rootScope.filterKey = searchKey;                
            });
            $httpBackend.flush();
            expect($rootScope.contacts[0].firstName).toContain(searchKey);
        });

    });
});