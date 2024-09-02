<?php
require_once "connect.php";

extract($_POST);
$password = hash("sha256", $password);
$sql = "select * from penggunas where nomor_hp = ? and password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nomor_hp, $password);
$stmt->execute();
$result = $stmt->get_result();

$arr = [];
if($row = $result->fetch_assoc()){
    $arr = ["result"=>"success", "data"=>$row["nama"]];
}
else{
    $arr = ["result"=> "err","data"=> "Pengguna tidak ditemukan."];
}
echo json_encode($arr);
$stmt->close();
$conn->close();
?>
