var elixir = require('laravel-elixir');

elixir(function(mix) {
    mix.sass('app.scss', 'public/css/vender.css');

    mix.styles("bootcards-desktop.min.css", 'public/css/bootcards.css');
    mix.styles("app.css", 'public/css/app.css');

    mix.scripts([
        '../../../node_modules/jquery/dist/jquery.min.js',
        '../../../node_modules/bootstrap/dist/js/bootstrap.min.js',
        '../../../node_modules/angular/angular.min.js',
        '../../../node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
        '../../../node_modules/angular-route/angular-route.min.js',
        '../../../node_modules/angular-animate/angular-animate.min.js',
        'bootbox/bootbox.min.js',
        'bootstrap-notify/bootstrap-notify.min.js',
        'bootcards-1.1.2/bootcards.min.js'
    ], 'public/js/vender.js');

    mix.scripts([
        '../../../public/app/mainCtrl.js',
        '../../../public/app/controllers/contactController.js',
        '../../../public/app/services/contactService.js',
        '../../../public/app/controllers/userController.js',
        '../../../public/app/services/userService.js',
        'common.js'
    ], 'public/js/app.js');
});
