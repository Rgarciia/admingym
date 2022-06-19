<?php
include("../db/dbconnect.php");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT SUM(TP) AS TV FROM
  (SELECT SUM(MONTO) AS TP FROM paids
  UNION
  SELECT SUM(MONTO) AS TS FROM sales
  UNION
  SELECT SUM(TOTAL) AS TV FROM visits
  ) AS total";
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