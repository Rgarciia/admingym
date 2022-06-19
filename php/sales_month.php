<?php
include("../db/dbconnect.php");

$hoy = date("m");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT * FROM sales WHERE MONTH(FECHA_REGISTRO) = $hoy LIMIT 5";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
       echo"<li class='list-group-item d-flex pd-sm-x-20'>
       <div class='avatar d-none d-sm-block'><span class='avatar-initial rounded-circle bg-teal'><i
             class='icon ion-md-checkmark'></i></span></div>
       <div class='pd-sm-l-10'>
         <p class='tx-medium mg-b-0'>Venta de $row[DESCR]</p>
         <small class='tx-12 tx-color-03 mg-b-0'>$row[FECHA_REGISTRO]</small>
       </div>
       <div class='mg-l-auto text-right'>
         <p class='tx-medium mg-b-0'>+ $$row[MONTO]</p>
         <small class='tx-12 tx-success mg-b-0'>Completada</small>
       </div>
     </li>";
     }
    } else {
      echo "<center><small class='tx-12 tx-danger mg-b-0'>No hay información para mostrar.</small></center>";
    }
}

mysqli_close($conn);

?>