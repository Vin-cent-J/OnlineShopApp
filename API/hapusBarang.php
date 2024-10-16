<?php
require_once "connect.php";

extract($_POST);
if(isset($id)) {
    $sql = "delete from barangs where id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menghapus barang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menghapus barang."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi."]);
}