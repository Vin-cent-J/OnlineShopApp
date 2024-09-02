<?php
require_once "connect.php";

extract($_POST);
$sql = "select * from penggunas where nomor_hp = ? & password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nomor_hp, $password);
$stmt->execute();
$result = $stmt->get_result();

$arr = [];
if($row = $result->fetch_assoc()){
    $arr = ["result"=>"success", "data"=>$row];
}
else{
    $arr = ["result"=> "err","data"=> "Pengguna tidak ditemukan."];
}
echo json_encode($arr);
$stmt->close();
$conn->close();
?>
