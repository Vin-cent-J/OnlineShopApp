<?php
require_once "connect.php";

extract($_POST);
if(isset($nama, $nomor_hp, $password, $alamat)) {
    $perans_id = 1;
    $password = hash("sha256", $password);
    $sql = "insert into penggunas(perans_id, nama, nomor_hp, password, alamat) values(?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("issss", $perans_id, $nama, $nomor_hp, $password, $alamat);
    $stmt->execute();

    $arr = [];
    if ($stmt->affected_rows){
        $arr = ["hasil"=>"success", "data"=>"Berhasil menambahkan pengguna."];
    }
    else{
        $arr = ["hasil"=> "err","data"=> "Nomor handphone sudah digunakan."];
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
} else{
    echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}
