<?php

namespace app\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Contact;
use Illuminate\Http\Request;
use App\Http\Requests\ContactRequest;
use Response;
use Auth;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get contacts.
     *
     * @return Json array
     */
    public function search(Request $request)
    {
        return Contact::search($request['searchKey'])->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Json array
     */
    public function store(ContactRequest $request)
    {
        Contact::create($request->all());

        return Response::json(['msg' => 'Successfully Contact Has Been Added']);
    }

    /**
     * Get the specified resource.
     *
     * @param int $id
     *
     * @return Json array
     */
    public function edit($id)
    {
        return Contact::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     *
     * @return Json Array
     */
    public function update(ContactRequest $request)
    {
        $contact = Contact::findOrFail($request->id);
        $contact->update($request->all());

        return Response::json(['msg' => 'Successfully Contact Has Been Updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return Json array
     */
    public function destroy($id, Request $request)
    {
        $contact = Contact::findOrFail($id);
        $deleted = $contact->delete($id);

        return Response::json(['msg' => 'Successfully Contact Has Been Removed']);
    }
}
