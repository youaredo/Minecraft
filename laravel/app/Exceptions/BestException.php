<?php

namespace App\Exceptions;

use Exception;

class BestException extends Exception
{
    public function __construct($code,$message=null)
    {
        $this->message=$message;
        $this->code=$code;
    }
}
