<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ChangePasswordController extends Controller
{
    public function passwordResetProcess(UpdatePasswordRequest $request){
        return $this->updatePasswordRow($request)->count() > 0 ? $this->resetPassword($request) : $this->tokenNotFoundError();
      }

      // Verify if token is valid
      private function updatePasswordRow($request){
         return DB::table('password_reset_tokens')->where([
             'email' => $request->email,
             'token' => $request->token
         ]);
      }

      // Token not found response
      private function tokenNotFoundError() {
          return response()->json([
            'message' => "Impossible de réinitialiser votre mot de passe. Vérifiez votre lien ou demandez-en un nouveau."
          ],Response::HTTP_UNPROCESSABLE_ENTITY);
      }

      // Reset password
      private function resetPassword($request) {
          // find email
          $userData = User::whereEmail($request->email)->first();
          // update password
          $userData->update([
            'password'=>bcrypt($request->password)
          ]);
          // remove verification data from db
          $this->updatePasswordRow($request)->delete();

          // reset password response
          return response()->json([
            'message'=>'Votre mot de passe a été changé avec succès !'
          ],Response::HTTP_CREATED);
      }
}
