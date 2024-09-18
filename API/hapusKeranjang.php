<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id, $barangs_id )) {
    $sql = "delete from keranjangs where penggunas_id=? and barangs_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii",$penggunas_id, $barangs_id);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menghapus isi keranjang."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menghapus isi keranjang."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data keranjang belum terisi semua."]);
}