<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    /**
     * The Database table uses by the Model.
     **/
    protected $table = 'contacts';

    /**
     * The valeus which are mass assignable.
     **/
    protected $fillable = ['salutation', 'firstName','lastName','dateOfBirth','address','mobileNo','fixedlineNo','nicNo'];

    protected $dates  = ['dateOfBirth'];

    /**
     * Conveting date of birth to Carbon object type.
     */
    public function setDateOfBirthAttribute($dateOfBirth)
    {
        $this->attributes['dateOfBirth'] = Carbon::parse($dateOfBirth);
    }

    public function getDateOfBirthAttribute()
    {
      return $this->attributes['dateOfBirth'];
    }

    /**
     * Scope a query to search contact by given firstName or lastName.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     **/
    public function scopeSearch($query, $filterKey)
    {
        return $query->where('firstName', 'like', '%'.$filterKey.'%')
                  ->orWhere('lastName', 'like', '%'.$filterKey.'%');
    }
}
