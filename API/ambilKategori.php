<?php
require_once "connect.php";

extract($_POST);
$sql = "SELECT id, nama FROM kategoris WHERE tgl_hapus IS NULL";

$arr = [];
$kategori = [];
if($hasil = $conn->query($sql)){
  while($row = $hasil->fetch_assoc()){
    $kategori[] = $row;
  } 
}
$arr = ["hasil"=>"success", "data"=>$kategori];
echo json_encode($arr);
$conn->close();
?>
