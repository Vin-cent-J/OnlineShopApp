<?php
require_once "connect.php";

extract($_POST);
if(isset($id)) {
    $tgl = date("Y-m-d");
    $sql = "update mereks set tgl_hapus = ? where id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $tgl ,$id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan merek barang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menambahkan merek."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}