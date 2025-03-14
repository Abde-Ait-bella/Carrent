<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;
use PharIo\Manifest\Url;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct($token, $email)
    {
        $this->token = $token;
        $this->email = $email;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        
    // $url = Url('/resetPassword', [
    //     'token' => $this->token,
    //     'email' => $this->email
    // ]);

    $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');
    $url = $frontendUrl . '/reset-password?' . http_build_query([
        'token' => $this->token,
        'email' => $this->email
    ]);
    
    return (new MailMessage)
    ->view('emails.reset-password', [
        'url' => $url,
        'user' => $notifiable
    ])
    ->subject(Lang::get('Réinitialisation du mot de passe - Carrent'));
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
