<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id, $barangs_id, $jumlah )) {
    $sql = "update keranjangs set jumlah=? where penggunas_id=? and barangs_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $jumlah, $penggunas_id, $barangs_id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah isi keranjang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal mengubah isi keranjang."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data keranjang belum terisi semua."]);
}