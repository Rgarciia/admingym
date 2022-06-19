<?php
include("../db/dbconnect.php");

$hoy = date("m");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT SUM(TP) AS TVM FROM
  (SELECT SUM(MONTO) AS TP FROM paids WHERE MONTH(FECHA_INI) = $hoy
  UNION
  SELECT SUM(MONTO) AS TS FROM sales WHERE MONTH(FECHA_REGISTRO) = $hoy
  UNION
  SELECT SUM(TOTAL) AS TV FROM visits WHERE MONTH(FECHA_VISIT) = $hoy
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