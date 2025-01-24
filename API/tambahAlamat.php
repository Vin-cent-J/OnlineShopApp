<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id, $alamat)) {
  $utama = 0;
  $sql = "INSERT into alamats(penggunas_id, alamat, utama) values(?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $penggunas_id, $alamat, $utama);
  $stmt->execute();
  if($stmt->affected_rows){
    echo json_encode(["hasil"=>"success", "data"=>"Berhasil menambahkan alamat"]);
  }
} else {
  echo json_encode(["hasil"=>"err", "data"=>"Pastikan variabel Id pengguna, alamat, dan utama sudah terisi"]);
}