<?php
include("../db/dbconnect.php");

$id=$_POST['idCustom'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT ID_USER, NAME, LASTNAME1, LASTNAME2, EMAIL, PHONE, ROLE, STATUS, PHOTO, FECHA_REGISTRO
  FROM users WHERE ID_USER=$id";
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