<?php
require_once "connect.php";

extract($_POST);
if(isset($nama, $foto)) {
    $sql = "insert into banners(nama, foto) values(?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nama, $foto);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan banner."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menambahkan banner."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}