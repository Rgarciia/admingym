<?php
include("../db/dbconnect.php");

$id=$_POST['idP'];
$email=$_POST['email'];
$fecha_ini=$_POST['fechaP'];
$fecha_vencimiento=$_POST['fechaV'];
$total=$_POST['monto'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "UPDATE paids SET FECHA_INI = '$fecha_ini', FECHA_FIN = '$fecha_vencimiento', MONTO = '$total'
        WHERE ID_PAID=$id AND email = '$email'";
        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>