<?php
require_once "connect.php";

extract($_POST);
if(isset($nama)) {
    $sql = "insert into kategoris(nama) values(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $nama);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan kategori produk."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menambahkan kategori."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi."]);
}