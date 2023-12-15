<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Otp;

class ResetPassOTP extends Notification
{
    use Queueable;
    public $message;
    public $subject;
    public $fromMail;
    public $mailer;
    public $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct()
    {
        $this->message = __("auth.otp_message");
        $this->subject = __("auth.otp_reset_pw_subject");
        $this->fromMail = "mahateamisgi@gmail.com";
        $this->mailer = "smtp";
        $this->otp = new Otp;
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
        $otp = $this->otp->generate($notifiable->email, 6, 60);
        return (new MailMessage)
            ->mailer($this->mailer)
            ->subject($this->subject)
            ->greeting('Hello !')
            ->line($this->message)
            ->line(__("auth.otp_code_message") . $otp->token);
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
