<?php

namespace App\Http\Controllers;

use App\Exceptions\BestException;
use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use Illuminate\Http\Request;
use function Termwind\ValueObjects\getLength;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $message = Message::where('id',">=","1")->simplePaginate(5);
        $ever = count(Message::all());
        if(!$message) throw new BestException('404','not found');

        $meta = [
          'pagination'=>[
              'ever'=>$ever,
              'current_page' => $message->currentPage(),
              'per_page' => $message->perPage(),
              'total' => $message->count(),
              'links'=>[
                  'previous'=> $message->previousPageUrl(),
                  'next'=>$message->nextPageUrl()
              ]
          ]
        ];

        $data = [];
        foreach ($message as $item){
            $data[] = [
                'id'=>$item->id,
                'user_id'=>$item->user_id,
                'nickname'=>$item->nickname,
                'datetime'=>$item->datetime,
                'content'=>$item->content,
            ];
        }

        $return = [
            'data'=>$data,
            "meta"=>$meta,
        ];
        return $this->json('success',$return);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMessageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMessageRequest $request)
    {
        if(!$request->all()) throw new BestException('422','data cannot be processed');
        $data = $request->all();
        $data['user_id'] = $request->user()['id'];
        $data['datetime'] = date('Y-m-d G:i:s');
        $data['nickname'] = $request->user()['name'];
        $message = Message::create($data);
        $message->save();
        return $this->json("success",['id'=>$message->id]);
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function show(Message $message)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMessageRequest  $request
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Message  $message
     * @return \Illuminate\Http\Response
     */
    public function destroy(Message $message,Request $request)
    {
        $user = $request->user();
        if($message['nickname'] !==$user['name']) throw new BestException('404');
        $message->delete();
        return response()->json('success');
    }

}
