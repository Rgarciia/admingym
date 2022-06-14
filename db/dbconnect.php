<?php
$servername = "146.190.224.109";
$username = "admingym";
$password = "admin4776";
$dbname = "salesapp";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
   // echo "Conexión Exitosa";
}

mysqli_close($conn);
?>