<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\Request;

use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use App\Mail\SendMailreset;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SendPasswordResetController extends Controller
{
    public function sendEmail(Request $request)  // this is most important function to send mail and inside of that there are another function
    {
        if (!$this->validateEmail($request->email)) {  // this is validate to fail send mail or true
            return $this->failedResponse();
        }
        $this->send($request->email);  //this is a function to send mail
        return $this->successResponse();
    }

    public function send($email)  //this is a function to send mail
    {
        $user = User::where('email', $email)->first();

        $token = $this->createToken($email);
        // Mail::to($email)->send(new SendMailreset($token, $email));  // token is important in send mail
        $user->notify(new ResetPasswordNotification($token, $email)); // token is important in send mail
    }

    public function createToken($email)  // this is a function to get your request email that there are or not to send mail
    {
        $oldToken = DB::table('password_reset_tokens')->where('email', $email)->first();

        if ($oldToken) {
            return $oldToken->token;
        }

        $token = Str::random(40);
        $this->saveToken($token, $email);
        return $token;
    }


    public function saveToken($token, $email)  // this function save new password
    {
        DB::table('password_reset_tokens')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }



    public function validateEmail($email)  //this is a function to get your email from database
    {
        return !!User::where('email', $email)->first();
    }

    public function failedResponse()
    {
        return response()->json([
            'error' => 'The email address was not found in our database.'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse()
    {
        return response()->json([
            'data' => 'Nous vous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre adresse e-mail.'
        ], Response::HTTP_OK);
    }
}
