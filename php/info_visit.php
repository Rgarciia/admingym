<?php
include("../db/dbconnect.php");

$id=$_POST['id'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT ID_VISIT, NAMEC, SEXO, PHONE, EMAIL, FOTO, FECHA_VISIT, 
  IF(FECHA_FIN >= CURDATE(), 'ACTIVO', 'VENCIDO') AS ESTADO FROM VISITS WHERE ID_VISIT=$id";
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