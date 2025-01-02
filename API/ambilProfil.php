<?php
require_once "connect.php";

extract($_POST);
$password = hash("sha256", $password);
$sql = "select * from penggunas where id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$hasil = $stmt->get_result();

$arr = [];
if($row = $hasil->fetch_assoc()){
    $arr = ["hasil"=>"success", "data"=>["id"=>$row["id"], "nama"=>$row["nama"], "alamat"=>$row["alamat"], "nomor_hp"=>$row["nomor_hp"]]];
}
else{
    $arr = ["hasil"=> "err","data"=> "Pengguna tidak ditemukan."];
}
echo json_encode($arr);
$stmt->close();
$conn->close();
?>