<?php
include("../db/dbconnect.php");

$des=$_POST['desc'];
$total=$_POST['total'];
$fecha=date("Y/m/d");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "INSERT INTO sales (DESCR, MONTO, FECHA_REGISTRO)
        VALUES ('$des', '$total', '$fecha')";

        if (mysqli_query($conn, $sql2)) {
        echo "0";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>