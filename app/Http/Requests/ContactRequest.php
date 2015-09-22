<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class ContactRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstName' => 'required|alpha_spaces|min:2',
            'lastName' => 'required|alpha_spaces|min:2',
            'nicNo' =>'required|alphaNum|between:10,15',
            'dateOfBirth' => 'date',
            'mobileNo' => 'phone|between:10,15',
            'fixedlineNo' => 'phone|between:10,15',
        ];
    }
}
