<?php

namespace App\Http\Controllers;

use App\Exceptions\BestException;
use App\Models\Todolist;
use App\Http\Requests\StoreTodolistRequest;
use App\Http\Requests\UpdateTodolistRequest;
use http\Client\Curl\User;
use Illuminate\Http\Request;

class TodolistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $message = Todolist::where('user_id',$request->user()['id'])->get();
        return $this->json('success',['item'=>$message]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTodolistRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTodolistRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = $request->user()['id'];
        $todolist = Todolist::create($data);
        $todolist -> save();
        return $this->json('success',['id'=>$todolist->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function show(Todolist $todolist)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function edit(Todolist $todolist)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTodolistRequest  $request
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTodolistRequest $request, Todolist $todolist)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todolist  $todolist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todolist $todolist)
    {
        $todolist->delete();
        return response()->json("success");
    }

    public function json($msg,$data){
        $re=[
            'mas'=>$msg
        ];
        if($data){
            $re['data']=$data;
        }
        return response()->json($re);
    }

    public function change_list($id){
        $data = Todolist::find($id);
        if(!$data)  throw new BestException(404,'not found');
        $data->update(['type'=>'Completed']);
        return response()->json('success');
    }

    public function delete_list(Request $request){
        $user = $request->user();
        $arr = array('user_id'=>$user['id'],'type'=>'Completed');
        $message = TodoList::where($arr);
        if(!$message)  throw new BestException(401,'unauthorized');
        $message->forceDelete();
        return response()->json('success');
    }
}
