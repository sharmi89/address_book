'use strict';

describe('UserApp Module', function() {

	var session, event;
    var $httpBackend, $rootScope, $q, controller, userService;

    beforeEach(module('userService'));
	beforeEach(module('UserApp'));

    beforeEach(inject(function($injector) {
        
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');
        $q = $injector.get('$q');
        
        session = $injector.get('Session');
        userService = $injector.get('User');

        controller =  $controller('UserAppController', {'$scope': $rootScope });

        // Some dummy functions, which are used from some other libraries
        event = {
            preventDefault: function () {}
        };
        window.notify = jasmine.createSpy();
		
    }));

 	describe("Login controller", function() {

      	it('Should be logout in initially', function(){
      		expect(session.userId).toEqual('');
      	});

      	it('Should send current user request to back-end', function(){

      		$httpBackend.expectGET('user/currentUser').respond(200, {});

      		userService.authenticate();
            $httpBackend.flush();
      		expect(session.userId).toBeUndefined();

      		$httpBackend.expectGET('user/currentUser').respond(200, {id: 1, name: 'test'});
      		
      		userService.authenticate();
            $httpBackend.flush();
      		expect(session.userId).toEqual(1);

      	});

      	it('Should login only with correct credential', function(){

      		$rootScope.user = {
      			email: '',
      			password: ''
      		};

      		$httpBackend.expectPOST('auth/login').respond(401, {});

      		$rootScope.login(event);
            $httpBackend.flush();
      		expect(session.userId).toBe('');

      		$rootScope.user = {
      			email: 'test@example.com',
      			password: '123456'
      		};

      		$httpBackend.expectPOST('auth/login').respond(200, {id: 1, name: 'test'});

      		$rootScope.login(event);
            $httpBackend.flush();
      		expect(session.userId).toEqual(1);
      	});

      	it('Should register new user', function(){

      		$rootScope.user = {
      			name: 'test',
      			email: 'test@example.com',
      			password: 'abc123',
      			password_confirmation: 'abc123'
      		};
      		// If data sucessfully saved
      		$httpBackend.expectPOST('auth/register').respond(200, {});

      		$rootScope.register(event);
      		$httpBackend.flush();
      		expect(session.userId).toBe('');

      		// If not supplied proper data
      		$httpBackend.expectPOST('auth/register').respond(422, {});

      		$rootScope.register(event);
      		$httpBackend.flush();
      		expect(session.userId).toBe('');
      	});
	});

});