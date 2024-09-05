<?php
require_once "connect.php";

extract($_POST);
if(isset($id)) {
    $tgl = date("Y-m-d");
    $sql = "update kategoris set tgl_hapus = ? where id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nama);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menghapus kategori produk."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menghapus kategori."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi."]);
}