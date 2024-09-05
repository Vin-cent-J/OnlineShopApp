<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id)) {
    $tgl = date("Y-m-d H:i:s");
    $sql = "insert into orders(tanggal, penggunas_id) values(?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $tgl, $penggunas_id);
    $stmt->execute();

    $orders_id = $conn->insert_id;

    $sql2 = "select k.barangs_id as id, k.jumlah as jumlah, b.harga as harga from keranjangs k inner join barangs b on k.barangs_id = b.id where penggunas_id = $penggunas_id";
    $row = $conn->query($sql2);

    $sql3 = "insert into detail_orders values(?, ?, ?, ?)";
    $stmt3 = $conn->prepare($sql3);

    while($row = $res->fetch_assoc()){

        $stmt3->bind_param("iiid", $orders_id, $row["id"], $row["jumlah"], $row["harga"]);
        $stmt3->execute();
    }

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Transaksi berhasil."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Transaksi gagal."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}
