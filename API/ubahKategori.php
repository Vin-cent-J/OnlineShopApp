<?php
require_once "connect.php";

extract($_POST);
if(isset($nama, $id )) {
    $sql = "update kategoris set nama=? where id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $nama, $id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah kategori."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal mengubah kategori."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}