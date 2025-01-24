<?php
require_once "connect.php";

extract($_POST);
if(isset($id, $no_hp, $nama, $password)) {
  $password = hash("sha256", $password);
  $type = "ssss";
  $parameter = [$nama, $no_hp];
  $sql = "update penggunas set nama=?, nomor_hp=?";
  if(isset($passwordBaru)){
    $passwordBaru = hash("sha256", $passwordBaru);
    $sql .= ", password=?";
    $passwordBaru = hash("sha256", $passwordBaru);
    $type .= "s";
    $parameter[] = $passwordBaru;
  }
  array_push($parameter, $id, $password);
  $sql .= " where id=? and password=?";

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