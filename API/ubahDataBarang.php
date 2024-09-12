<?php
require_once "connect.php";

extract($_POST);
if(isset($id, $nama, $harga, $foto, $mereks_id, $kategoris_id)) {
    $sql = "update barangs set nama=?, stok=?, harga=?, foto=?, mereks_id=?, kategoris_id=? where id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sidsiii", $nama, $stok, $harga, $foto, $mereks_id, $kategoris_id, $id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah data barang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal mengubah data barang."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}