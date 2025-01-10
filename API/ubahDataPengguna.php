<?php
require_once "connect.php";

extract($_POST);
if(isset($no_hp, $nama, $alamat, $password)) {
  $type = "ssss";
  $parameter = [$nama, $alamat];
  $sql = "update penggunas set nama=?, alamat=?";
  if(isset($passwordBaru)){
    $sql .= ", password=?";
    $passwordBaru = hash("sha256", $passwordBaru);
    $type .= "s";
    $parameter[] = $passwordBaru;
  }
  array_push($parameter, $no_hp, $password);
  $sql .= " where nomor_hp=? and password= ?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param($type, ...$parameter);
  $stmt->execute();

  $arr = [];
  if ($stmt->affected_rows){
    $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah data pengguna."];
  }
  else{
    $arr = ["hasil"=> "err", "data"=> "Gagal mengubah data pengguna."];
  }
  echo json_encode($arr);
  $stmt->close();
  $conn->close();
} else{
  echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}