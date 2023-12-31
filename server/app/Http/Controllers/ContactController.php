<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use PHPMailer\PHPMailer\PHPMailer;

class ContactController extends Controller
{
    public function contact(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'comment' => 'required|max:400',
        ]);

        $email = $request->input('email');
        $comment = $request->input('comment');

        $mailer = new PHPMailer(true);

        try {
            $mailer->isSMTP();
            $mailer->Host       = env('MAIL_HOST');
            $mailer->SMTPAuth   = true;
            $mailer->Username   = env("MAIL_USERNAME");
            $mailer->Password   = env("MAIL_PASSWORD");
            $mailer->SMTPSecure = env("MAIL_ENCRYPTION");
            $mailer->Port       = 587;

            $mailer->setFrom('infinityscipt.cv@gmail.com', 'InfinityScript');
            $mailer->addAddress('infinityscipt.cv@gmail.com');

            $mailer->isHTML(true);
            $mailer->Subject = 'InfinityScript Comment';
            $mailer->Body    = "<b>Email: $email</b><br>Comment: $comment";

            $mailer->send();

            return response()->json(['message' => __("auth.mail_sent")], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
