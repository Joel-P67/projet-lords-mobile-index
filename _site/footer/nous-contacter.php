<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Adresse email de réception
    $to = "lords.mobile.index@gmail.com";  // Remplacez par votre adresse email

    // Sujet de l'email
    $subject = "Message de contact depuis le site Lords Mobile";

    // Corps de l'email
    $body = "Nom : $name\n";
    $body .= "Email : $email\n";
    $body .= "Message :\n$message";

    // En-têtes pour l'email
    $headers = "From: $email";

    // Envoi de l'email
    if (mail($to, $subject, $body, $headers)) {
        echo "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.";
    } else {
        echo "Une erreur est survenue. Veuillez réessayer plus tard.";
    }
}
?>
