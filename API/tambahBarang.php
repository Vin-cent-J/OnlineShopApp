<?php
require_once "connect.php";

extract($_POST);
if(isset($nama, $stok, $harga, $deskripsi, $foto, $mereks_id, $kategoris_id)) {
    $sql = "insert into barangs(nama, stok, harga, deskripsi, foto, mereks_id, kategoris_id) values(?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sidssii", $nama, $stok, $harga, $deskripsi, $foto, $mereks_id, $kategoris_id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan barang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menambahkan barang."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}