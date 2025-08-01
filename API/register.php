<?php
require_once "connect.php";

extract($_POST);
if(isset($id, $nama, $nomor_hp, $password, $alamat)) {
    $perans_id = 2;
    $password = hash("sha256", $password);
    $sql = "insert into penggunas(id, perans_id, nama, nomor_hp, password) values(?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sisss", $id, $perans_id, $nama, $nomor_hp, $password);
    $stmt->execute();

    $utama = 0;
    $sql2 = "INSERT into alamats(penggunas_id, alamat, utama, kota, provinsi) values(?,?,?,?,?)";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param("ssiss", $id, $alamat, $utama, $kota, $provinsi);
    $stmt2->execute();

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
