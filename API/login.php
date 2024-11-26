<?php
require_once "connect.php";

extract($_POST);
$password = hash("sha256", $password);
$sql = "select * from penggunas where nomor_hp = ? and password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $nomor_hp, $password);
$stmt->execute();
$hasil = $stmt->get_result();

$arr = [];
if($row = $hasil->fetch_assoc()){
    $arr = ["hasil"=>"success", "data"=>["id"=>$row["id"], "nama"=>$row["nama"]]];
}
else{
    $arr = ["hasil"=> "err","data"=> "Pengguna tidak ditemukan."];
}
echo json_encode($arr);
$stmt->close();
$conn->close();
?>
