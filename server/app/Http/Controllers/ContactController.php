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
            $mailer->Host       = 'smtp.gmail.com';
            $mailer->SMTPAuth   = true;
            $mailer->Username   = 'infinityscipt.cv@gmail.com';
            $mailer->Password   = 'rogo yfbz yfru tsqd';
            $mailer->SMTPSecure = 'tls';
            $mailer->Port       = 587;

            $mailer->setFrom('infinityscipt.cv@gmail.com', 'InfinityScript');
            $mailer->addAddress('infinityscipt.cv@gmail.com');

            $mailer->isHTML(true);
            $mailer->Subject = 'InfinityScript Comment';
            $mailer->Body    = "<b>Email: $email</b><br>Comment: $comment";

            $mailer->send();

            return response()->json(['message' => 'Email sent successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
