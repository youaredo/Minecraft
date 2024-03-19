<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Todolist extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = "todolist";

    protected $fillable = ['datetime','content','type','user_id'];

    public $timestamps = false;
}
