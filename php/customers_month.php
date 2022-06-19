<?php
include("../db/dbconnect.php");

$hoy = date("m");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
  $sql = "SELECT * FROM customers WHERE MONTH(FECHA_REGISTRO) = $hoy LIMIT 5";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
       echo"<li class='list-group-item d-flex pd-sm-x-20'>
       <div class='avatar d-none d-sm-block'><img src='$row[FOTO]' class='rounded-circle' alt='User'></a></div>
       <div class='pd-sm-l-10'>
         <p class='tx-medium mg-b-0'>$row[NAME] $row[LASTNAME1] $row[LASTNAME2]</p>
         <small class='tx-12 tx-color-03 mg-b-0'>$row[EMAIL]</small>
       </div>
       <div class='mg-l-auto text-right'>
         <p class='tx-medium mg-b-0'>$row[FECHA_REGISTRO]</p>
         <small class='tx-12 tx-success mg-b-0'>Fecha Registro</small>
       </div>
     </li>";
     }
    } else {
      echo "<center><small class='tx-12 tx-danger mg-b-0'>No hay información para mostrar.</small></center>";
    }
}

mysqli_close($conn);

?>