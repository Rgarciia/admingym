<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "salesapp";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
   // echo "Conexión Exitosa";
}

mysqli_close($conn);
?>