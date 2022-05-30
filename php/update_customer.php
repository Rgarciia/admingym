<?php
include("../db/dbconnect.php");

$id=$_POST['idCu'];
$email=$_POST['email'];
$name=$_POST['name'];
$apaterno=$_POST['apaterno'];
$amaterno=$_POST['amaterno'];
$phone=$_POST['phone'];
$status=$_POST['status'];
$sexo=$_POST['sexo'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "UPDATE customers SET NAME = '$name', LASTNAME1 = '$apaterno', LASTNAME2 = '$amaterno', EMAIL = '$email', 
        PHONE = '$phone', STATUS = '$status', SEXO = '$sexo' WHERE ID_CUSTOM=$id";
        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>