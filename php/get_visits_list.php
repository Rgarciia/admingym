<?php
include("../db/dbconnect.php");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
    $sql = "SELECT ID_VISIT, NAMEC, SEXO, PHONE, EMAIL, FECHA_VISIT, FECHA_FIN, PAGO, CONCAT('$', TOTAL) AS MONTO FROM VISITS";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = array();
            while ($row = mysqli_fetch_assoc($result))
            {
                $data[] = $row;
            }
        $results = ['customers' => $data];
        echo json_encode($results);
    } else {
        echo "0";
    }
}

mysqli_close($conn);

?>