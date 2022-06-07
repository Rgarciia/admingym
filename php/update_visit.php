<?php
include("../db/dbconnect.php");

$id=$_POST['idCu'];
$email=$_POST['email'];
$name=$_POST['name'];
$phone=$_POST['phone'];
$sexo=$_POST['sexo'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "UPDATE visits SET NAMEC = '$name', EMAIL = '$email', PHONE = '$phone', SEXO = '$sexo' WHERE ID_VISIT=$id";
        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>