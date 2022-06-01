<?php
include("../db/dbconnect.php");

$email=$_POST['email'];
$pass=md5($_POST['password']);
$tipo=$_POST['tipo'];


$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
    $sql = "SELECT * FROM users WHERE EMAIL='$email' AND PASSWORD='$pass' AND ROLE='$tipo' AND STATUS=1";
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