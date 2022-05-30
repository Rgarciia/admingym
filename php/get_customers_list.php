<?php
include("../db/dbconnect.php");

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}else{
    $sql = "SELECT ID_CUSTOM, NAME, EMAIL, PHONE, SEXO, 
    IF(STATUS = 1, 'ACTIVO', 'NO ACTIVO') AS ESTADO,
    FECHA_REGISTRO
    FROM
    (SELECT ID_CUSTOM, CONCAT(NAME,' ',LASTNAME1,' ',LASTNAME2) AS NAME, EMAIL, PHONE, SEXO, STATUS, FECHA_REGISTRO
    FROM customers) AS result";
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