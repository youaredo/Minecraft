<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        $name = get_class($e);
        $code = $e->getCode();
        $data = [
            'code' => 500,
            'data' => [
                'msg' => $e->getMessage()
            ]
        ];
        if ($code == 401 || $name == 'Symfony\Component\Routing\Exception\RouteNotFoundException') {
            if ($request->bearerToken()) {
                $data['code'] = 404;
                $data['data']['msg'] = 'not found';
            } else {
                $data['code'] = 401;
                $data['data']['msg'] = 'unauthorized access';
            }
        }
        if ($code == 404 || $name == 'Illuminate\Database\Eloquent\ModelNotFoundException') {
            $data['code'] = 404;
            $data['data']['msg'] = 'not found';
        }

        if ($code == 422 || $name == "Illuminate\Validation\ValidationException") {
            $data['code'] = 422;
            $data['data']['msg'] = 'data cannot be processed';
        }

        if ($name == 'App\Exceptions\BestException' && $e->getMessage()) {
            $data['data']['msg'] = $e->getMessage();
        }

        return response()->json($data['data'], $data['code']);
    }
}
