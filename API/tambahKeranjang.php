<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id, $barangs_id, $jumlah)) {
    $sql = "insert into keranjangs values(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $penggunas_id, $barangs_id, $jumlah);
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