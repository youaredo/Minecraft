<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Message extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "message";

    protected $fillable = ['user_id','datetime','nickname','content'];

    public $timestamps = false;
}
