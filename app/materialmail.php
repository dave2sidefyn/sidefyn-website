<?php
/**
 * E-Mails us
 *
 * @author David Wiedmer <dave@sidefyn.ch>
 */
$to = 'mo@sidefyn.ch';
$subject = 'Materialvermietung: ' . $_POST['name'];
$message =
    'Name: ' . $_POST['name'] .
    "\r\nE-Mail: " . $_POST['email'] .
    "\r\nTelefon: " . $_POST['telefon'] .
   // "\r\nZeitraum: " . $_POST['datevon'] . '-' . $_POST['datebis'] .
    "\r\nArtikel: " . $_POST['listartikel'] .
    "\r\nNachricht: " . $_POST['message'];
$headers = 'From: ' . $_POST['mail'] . "\r\n" .
    'Reply-To: ' . $_POST['mail'] . "\r\n";

echo mail($to, $subject, $message, $headers);

