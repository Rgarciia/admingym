<?php
include("../db/dbconnect.php");

$id=$_POST['ids'];
$des=$_POST['desc'];
$total=$_POST['total'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "UPDATE sales SET DESCR = '$des', MONTO = '$total' WHERE ID_SALE=$id";
        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>