<?php

namespace App\Http\Controllers;

use App\Exceptions\BestException;
use App\Models\user;
use App\Http\Requests\StoreuserRequest;
use App\Http\Requests\UpdateuserRequest;
use Illuminate\Http\Request;
use function League\Flysystem\delete;

class UserController extends Controller
{
    public function register(StoreuserRequest $request)
    {
        $data = $request->all();
        $user = User::where('name',$data['name'])->first();
        if($user) throw new BestException('422','This account has already been taken');
        $data['age'] = date('y') - date('y', strtotime($data['birth']));
        User::create($data);
        return response()->json("success");
    }


    public function login(Request $request)
    {
        $data = $request->all();
        $user = User::where('name',$data['name'])->first();
        if($data['password'] !== $user['password']) throw new BestException('401','user credentials are invalid');
        $data = [
            'token'=>$user->createToken('user', ['server:never'])->plainTextToken,
            'account'=>$user['id'],
            'nickname'=>$user['name'],
            'birth'=>$user['birth'],
            'age'=>$user['age'],
            'profile'=>$user['content'],
            'is_admin'=>0,
        ];
        return $this->json("success",$data);
    }

    public function updateUser(Request $request){

        $only = User::where('name',$request['name'])->first();
        if($only) throw new BestException('404','name be has!');
        $user = $request->user();
        $data = $request->all();
        foreach ($data as $key => $item) {
            $user->update([$key => $item]);
        }
        $user->update(['age' => date('y') - date('y', strtotime($user->birth))]);
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

    public function logout(Request $request)
    {
        $user = $request->user();
        $bool = $user->tokens()->delete();
        if(!$bool) throw new BestException('401',"unauthorized");
        return response()->json("success");
    }

    public function get_self(Request $request)
    {
        $user = $request->user();
        $message = [
          'id'=>$user['id'],
          'nickname'=>$user['name'],
          'birth'=>$user['birth'],
          'age'=>$user['age'],
          'content'=>$user['content'],
        ];
        return $this->json("success",$message);
    }
}
