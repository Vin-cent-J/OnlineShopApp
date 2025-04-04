<?php
require_once "connect.php";

extract($_POST);
if(isset($id, $alamat, $utama)) {
  $sql = "UPDATE alamats SET alamat=?, utama=?, kota=?, provinsi=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sissi", $alamat, $utama, $kota, $provinsi, $id);
  $stmt->execute();
  if($stmt->affected_rows){
    echo json_encode(["hasil"=>"success", "data"=>"Berhasil mengubah alamat"]);
  }
} else {
  echo json_encode(["hasil"=>"err", "data"=>"Pastikan variabel Id pengguna, alamat, dan utama sudah terisi"]);
}