<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id)) {
    $sql2 = "select k.barangs_id as id, k.jumlah as jumlah, b.harga as harga from keranjangs k inner join barangs b on k.barangs_id = b.id where penggunas_id = $penggunas_id";
    $res = $conn->query($sql2);

    $keranjang = [];
    while($row = $res->fetch_assoc()) {
        $keranjang[] = $row;
    }

    $arr = [];
    if(count($keranjang) >= 1){
        $arr = ["hasil"=>"success", "data"=>$keranjang];
    }
    else{
        $arr = ["hasil"=> "err","data"=>"Keranjang kosong"];
    }
   

    echo json_encode($arr);
    $stmt->close();
    $conn->close();

}