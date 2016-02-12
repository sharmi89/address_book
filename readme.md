# Addres Book

The simple SPA application for Create, update and edit the conacts with login system.

Application has been created by using angular for front end and the laravel 5.1 for back end. Bootstarp 3, Bootcards, Bootbox and bootstrap notify were used for front end designing. node and npm were used for the package indicreation. Gulp and laravel elixir were used for minify the package javascript and css. Angular has been used with module wise.

## Installation
1. Download application using composer or as a zip file and then install composer. You may have to give file permissions to /public and /storage folders in linux distributions. [Refer](https://laravel.com/docs/5.2/installation)
2. Setup back-end configurations for database and vhost and then run table migrations.
3. Install node and npm if not installed jet, install npm packages. Perfer versions node -v 4.2.x and npm -v 3.5.x. If you are using some older versions for node and npm, you may have to update the npm packages.
4. Run `npm run gulp` to Minify and concat the dependancy packages. Minified files will auto include in layout view.
5. Run your application and initially you have to create the user through ***New user*** tab.

## Testing 
Front-end unit testing has been developed using [karma](https://karma-runner.github.io/0.13/index.html) and [jasmine](http://jasmine.github.io/2.0/introduction.html). You can test using `$ ./node_modules/karma/bin/karma start`
