<?php
include("../db/dbconnect.php");

$id=$_POST['idCu'];
$email=$_POST['email'];
$name=$_POST['name'];
$apaterno=$_POST['apaterno'];
$amaterno=$_POST['amaterno'];
$phone=$_POST['phone'];
$status=$_POST['status'];
$role=$_POST['role'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "UPDATE users SET NAME = '$name', LASTNAME1 = '$apaterno', LASTNAME2 = '$amaterno', EMAIL = '$email', 
        PHONE = '$phone', STATUS = '$status', ROLE = '$role' WHERE ID_USER=$id";
        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>