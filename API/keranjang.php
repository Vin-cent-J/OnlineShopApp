<?php
require_once "connect.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

extract($_POST);
if(isset($penggunas_id)) {
    $sql2 = "select k.barangs_id as id, k.jumlah as jumlah, b.harga as harga from keranjangs k inner join barangs b on k.barangs_id = b.id where penggunas_id = ?";
    $stmt = $conn->prepare($sql2);
    $stmt->bind_param("i", $penggunas_id);
    $stmt->execute();
    $hasil = $stmt->get_result();

    $keranjang = [];
    while($row = $hasil->fetch_assoc()) {
        $keranjang[] = $row;
    }

    $arr = [];
    if(count($keranjang) >= 1){
        $arr = ["status"=>"success", "data"=>$keranjang];
    }
    else{
        $arr = ["status"=> "err","data"=>"Keranjang kosong"];
    }
   

    echo json_encode($arr);
    $stmt->close();
    $conn->close();
}