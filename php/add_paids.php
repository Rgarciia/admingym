<?php
include("../db/dbconnect.php");

$id=$_POST['id'];
$email=$_POST['email'];
$fecha_ini=$_POST['fecha_ini'];
$fecha_vencimiento=$_POST['fecha_vencimiento'];
$pago=$_POST['pago'];
$total=$_POST['total'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "INSERT INTO paids (ID_CUSTOM, EMAIL, FECHA_INI, FECHA_FIN, TIPO_PAGO, MONTO)
        VALUES ($id, '$email', '$fecha_ini', '$fecha_vencimiento', '$pago', '$total')";

        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>