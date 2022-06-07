<?php
include("../db/dbconnect.php");

$name=$_POST['name'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$sexo=$_POST['sexo'];
$photo=$_POST['photo'];
$fecha_ini=$_POST['fecha_ini'];
$fecha_vencimiento=$_POST['fecha_vencimiento'];
$pago=$_POST['pago'];
$total=$_POST['total'];

$fotoEncr = str_replace(" ","+",$photo);

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "INSERT INTO visits (NAMEC, EMAIL, PHONE, SEXO, FOTO, FECHA_VISIT, FECHA_FIN, PAGO, TOTAL)
        VALUES ('$name', '$email', '$phone', '$sexo', '$fotoEncr', '$fecha_ini', '$fecha_vencimiento', '$pago', '$total')";

        if (mysqli_query($conn, $sql2)) {
        echo "0";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>