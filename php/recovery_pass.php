<?php
include("../db/dbconnect.php");

$email=$_POST['email'];
$pass=md5($_POST['password']);

$to = $email;
$from = 'al221310967@gmail.com';
$subject = 'Recuperación de Contraseña';

$headers = "From: " . strip_tags($from) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";


$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
    $sql = "SELECT * FROM users WHERE EMAIL='$email' AND STATUS = 1";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)) {
        $sql2 = "UPDATE users SET  PASSWORD = '$pass' WHERE ID_USER=$row[ID_USER]";
        if (mysqli_query($conn, $sql2)) {
            $message = '<html><body>';
            $message .= '<img src="//css-tricks.com/examples/WebsiteChangeRequestForm/images/wcrf-header.png" alt="Website Change Request" />';
            $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
            $message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . strip_tags($row[ID_USER]) . "</td></tr>";
            $message .= "<tr><td><strong>Email:</strong> </td><td>" . strip_tags($row[EMAIL]) . "</td></tr>";
            $message .= "<tr><td><strong>Phonr:</strong> </td><td>" . strip_tags($row[PHONE]) . "</td></tr>";
            $message .= "</table>";
            $message .= "</body></html>";

            if (mail($to, $subject, $message, $headers)) {
                echo 'Your message has been sent.';
              } else {
                echo 'There was a problem sending the email.';
              }

        echo "1";
        } else {
        echo "2";
        }
      }
    } else {
        echo "0";
    }
}

mysqli_close($conn);

?>