<?php
include("../db/dbconnect.php");

$name=$_POST['name'];
$phone=$_POST['phone'];
$email=$_POST['email'];
$sexo=$_POST['sexo'];
$photo=$_POST['foto'];
$fecha_ini=$_POST['fechaP'];
$fecha_vencimiento=$_POST['fechaV'];
$pago=$_POST['pago'];
$total=$_POST['monto'];

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