<?php

namespace app\Providers;

use Illuminate\Support\ServiceProvider;
use App\CustomValidator\CustomValidator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        // This is for Custom validator
      $this->app->validator->resolver(function ($translator, $data, $rules, $messages) {
          return new CustomValidator($translator, $data, $rules, $messages);
      });
    }

    /**
     * Register any application services.
     */
    public function register()
    {
        //
    }
}
