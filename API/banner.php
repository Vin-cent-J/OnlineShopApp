<?php
require_once "connect.php";

$sql = "SELECT * FROM banners";

$arr = [];
$banner = [];
if($hasil = $conn->query($sql)){
  while($row = $hasil->fetch_assoc()){
    $banner[] = $row;
  }
}
$arr = ["hasil"=>"success", "data"=>$banner];
echo json_encode($arr);
$conn->close();
?>