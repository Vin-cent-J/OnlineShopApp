<?php
require_once "connect.php";

extract($_POST);
if(isset($nama, $id )) {
  $tanggal = date('Y-m-d H:i:s');
  $sql = "update statuss set status=?, tanggal=? where id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssi", $nama, $tanggal, $id);
  $stmt->execute();

  $arr = [];
  if ($stmt->affected_rows){
      $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah status order."];
  }
  else{
      $arr = ["hasil"=> "err","data"=> "Gagal mengubah status order."];
  }
  echo json_encode($arr);
  $stmt->close();
  $conn->close();
} else{
  echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}