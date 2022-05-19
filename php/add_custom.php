<?php
include("../db/dbconnect.php");

$email=$_POST['email'];
$pass=$_POST['password'];
$tipo=$_POST['tipo'];


$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
    $sql = "SELECT * FROM customers WHERE EMAIL='$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
       echo "1"
    }
    } else {
        $sql2 = "INSERT INTO MyGuests (firstname, lastname, email)
        VALUES ('John', 'Doe', 'john@example.com')";

        if (mysqli_query($conn, $sql2)) {
        echo "0";
        } else {
        echo "Error: " . $sql2 . "<br>" . mysqli_error($conn);
        }
    }
}

mysqli_close($conn);

?>