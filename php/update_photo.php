<?php
include("../db/dbconnect.php");

$id=$_POST['id'];
$foto=$_POST['foto'];

$fotoEncr = str_replace(" ","+",$foto);

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
        $sql2 = "UPDATE users SET PHOTO = '$fotoEncr' WHERE ID_USER = '$id'";
        if (mysqli_query($conn, $sql2)) {
        echo "1";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
}

mysqli_close($conn);

?>