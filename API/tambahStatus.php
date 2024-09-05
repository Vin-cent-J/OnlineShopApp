<?php
require_once "connect.php";

extract($_POST);
if(isset($orders_id, $status)) {
    $sql = "insert into statuss(orders_id, tanggal, status) values(?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $orders_id, $tanggal, $status);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan status order."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Gagal menambahkan status order."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}