<?php
require_once "connect.php";
$id = 4;
extract($_POST);
if(isset($id)) {
  $tgl = date("Y-m-d H:i:s");
  $sql = "UPDATE kategoris SET `tgl_hapus` = ? WHERE `id` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $tgl, $id);
  $stmt->execute();

  $arr = [];
  if ($stmt->affected_rows){
      $arr = ["hasil"=>"success", "data"=>"Berhasil menghapus kategori produk."];
  }
  else{
      $arr = ["hasil"=> "err","data"=> "Gagal menghapus kategori.", "error"=>$stmt->error];
  }
  echo json_encode($arr);
  $stmt->close();
} else{
  echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi."]);
}