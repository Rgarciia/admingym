<?php
include("../db/dbconnect.php");

$id=$_POST['idCustom'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT ID_CUSTOM, NAME, LASTNAME1, LASTNAME2, EMAIL, PHONE, SEXO, STATUS, FOTO, FECHA_REGISTRO
  FROM customers WHERE ID_CUSTOM=$id";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
       echo json_encode($row);
    }
    } else {
    echo "0";
    }
}

mysqli_close($conn);

?>