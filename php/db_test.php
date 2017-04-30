<?php

require("db_credentials.php");


// ========== mysqli object 
$conn = new mysqli($servername, $username, $password);

if($conn->connect_error){
    die("mysqli object connect failed" . $conn->connect_error);
}

echo "mysqli object connect successfully <br>"; 

$conn->close();

//============ mysqli procedure
$conn2 = mysqli_connect($servername, $username, $password);

if(!$conn2){
    die("mysqli procedure connect failed" . mysqli_connect_error() );
}

echo "mysqli procedure connect successfully <br>";

mysqli_close($conn2);

// ==============  pdo style

try{
    $conn3 = new PDO("mysql:host=$servername;dbname=test", $username, $password);
    echo "pdo connect successfully <br>";

    $conn3 = null;
}catch(PDOException $e){
  echo $e->getMessage();
}




?>
