<?php
include("../db/dbconnect.php");

$id=$_POST['idP'];

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT 
  ID_PAID, ID_CUSTOM, EMAIL, NAME, FECHA_INI, FECHA_FIN, TIPO_PAGO, MONTO,
  IF(FECHA_FIN >= CURDATE(), 'ACTIVO', 'VENCIDO') AS ESTADO
  FROM 
  (SELECT p.ID_PAID, p.ID_CUSTOM, p.EMAIL, CONCAT(c.NAME,' ',c.LASTNAME1,' ',c.LASTNAME2) AS NAME,
  p.FECHA_INI, p.FECHA_FIN, p.TIPO_PAGO, CONCAT(p.MONTO) AS MONTO FROM paids p
  INNER JOIN customers c ON p.ID_CUSTOM = c.ID_CUSTOM)AS result1 WHERE ID_PAID=$id";
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