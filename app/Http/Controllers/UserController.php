<?php

namespace app\Http\Controllers;

use Response;
use Auth;

class UserController extends Controller
{
    /**
     * Return currently loggedin User.
     **/
    public function getCurrentUser()
    {
        if (Auth::user()) {
            return Response::json(['id' => Auth::user()->id, 'name' => Auth::user()->name], 200);
        }

        return Response::json(['msg' => 'You are not logged In'], 401);
    }
}
