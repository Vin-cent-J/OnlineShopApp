<?php
require_once "connect.php";

extract($_POST);
$password = hash("sha256", $password);
$sql = "select perans_id from penggunas where id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $id);
$stmt->execute();
$hasil = $stmt->get_result();

$arr = [];
if($row = $hasil->fetch_assoc()){
    $arr = ["hasil"=>"success", "data"=>[$row]];
}
else{
    $arr = ["hasil"=> "err","data"=> "Pengguna tidak ditemukan."];
}
echo json_encode($arr);
$stmt->close();
?>
