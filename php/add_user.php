<?php
include("../db/dbconnect.php");

$name=$_POST['name'];
$lastname1=$_POST['lastname1'];
$lastname2=$_POST['lastname2'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$role=$_POST['role'];
$pass1=md5($_POST['pass1']);
$photo=$_POST['photo'];
$fecha=date("Y/m/d H:i:s");

$fotoEncr = str_replace(" ","+",$photo);

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
    $sql = "SELECT * FROM users WHERE EMAIL='$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      while($row = mysqli_fetch_assoc($result)) {
        echo "1";
      }
    } else {
        $sql2 = "INSERT INTO users (NAME, LASTNAME1, LASTNAME2, EMAIL, PHONE, PASSWORD, ROLE, PHOTO, FECHA_REGISTRO, STATUS)
        VALUES ('$name', '$lastname1', '$lastname2', '$email', '$phone', '$pass1', '$role', '$fotoEncr', '$fecha', 1)";

        if (mysqli_query($conn, $sql2)) {
        echo "0";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
    }
}

mysqli_close($conn);

?>