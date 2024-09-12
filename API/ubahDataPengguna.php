<?php
require_once "connect.php";

extract($_POST);
if(isset($no_hp, $nama, $alamat, $password)) {
    $sql = "update penggunas set nama=?, alamat=?, password=? where nomor_hp=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nama, $alamat, $password, $no_hp);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah data pengguna."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal mengubah data pengguna."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}