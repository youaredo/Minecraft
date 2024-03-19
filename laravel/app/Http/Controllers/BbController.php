<?php

namespace App\Http\Controllers;

use App\Models\bb;
use App\Http\Requests\StorebbRequest;
use App\Http\Requests\UpdatebbRequest;

class BbController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorebbRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorebbRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\bb  $bb
     * @return \Illuminate\Http\Response
     */
    public function show(bb $bb)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\bb  $bb
     * @return \Illuminate\Http\Response
     */
    public function edit(bb $bb)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatebbRequest  $request
     * @param  \App\Models\bb  $bb
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatebbRequest $request, bb $bb)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\bb  $bb
     * @return \Illuminate\Http\Response
     */
    public function destroy(bb $bb)
    {
        //
    }
}
