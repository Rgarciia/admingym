<?php
include("../db/dbconnect.php");

$hoy = date("m");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT * FROM
  (SELECT 
      ID_PAID, EMAIL, NAME, FECHA_INI, FECHA_FIN, TIPO_PAGO, MONTO,
      IF(FECHA_FIN >= CURDATE(), 'ACTIVO', 'VENCIDO') AS ESTADO
      FROM 
      (SELECT p.ID_PAID, p.ID_CUSTOM, p.EMAIL, CONCAT(c.NAME,' ',c.LASTNAME1,' ',c.LASTNAME2) AS NAME,
      p.FECHA_INI, p.FECHA_FIN, p.TIPO_PAGO, CONCAT('$',p.MONTO) AS MONTO FROM paids p
      INNER JOIN customers c ON p.ID_CUSTOM = c.ID_CUSTOM AND c.STATUS = 1)AS result1) AS resultF 
  WHERE ESTADO='VENCIDO' LIMIT 5;";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
       echo"<li class='list-group-item d-flex pd-sm-x-20'>
       <div class='avatar d-none d-sm-block'><span class='avatar-initial rounded-circle bg-teal'><i
             class='icon ion-md-close'></i></span></div>
       <div class='pd-sm-l-10'>
         <p class='tx-medium mg-b-0'>Venta de $row[NAME]</p>
         <small class='tx-12 tx-color-03 mg-b-0'>$row[FECHA_FIN]</small>
       </div>
       <div class='mg-l-auto text-right'>
         <p class='tx-medium mg-b-0'>+ $$row[MONTO]</p>
         <small class='tx-12 tx-danger mg-b-0'>$row[ESTADO]</small>
       </div>
     </li>";
     }
    } else {
    echo "<center><small class='tx-12 tx-danger mg-b-0'>No hay información para mostrar.</small></center>";
    }
}

mysqli_close($conn);

?>