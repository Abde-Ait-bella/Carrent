<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class PermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {

            $currentName    =   Route::getCurrentRoute()->getName();
             if (Auth::user()->can($currentName)) {
                 return $next($request);
             }else{
                 return response()->view('errors.403', ['prevPage'=> URL::previous()]);
             }
 
             return $next($request);
         }
         return response('')->json(['message'=>'note permission']);
    }
}
