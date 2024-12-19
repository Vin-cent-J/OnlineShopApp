<?php
require_once "connect.php";

extract($_POST);
$sql = "SELECT id, nama FROM mereks WHERE tgl_hapus IS NULL";

$arr = [];
$merek = [];
if($hasil = $conn->query($sql)){
  while($row = $hasil->fetch_assoc()){
    $merek[] = $row;
  }
}
$arr = ["hasil"=>"success", "data"=>$merek];
echo json_encode($arr);
$conn->close();
?>
