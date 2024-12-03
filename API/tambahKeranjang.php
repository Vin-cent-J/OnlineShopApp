<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id) && isset($barangs_id) && isset($jumlah)) {
    $sql = "insert into keranjangs values(?, ?, ?) ON DUPLICATE KEY UPDATE jumlah = jumlah + ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiii", $penggunas_id, $barangs_id, $jumlah, $jumlah);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan barang ke keranjang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menambahkan barang ke keranjang."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}