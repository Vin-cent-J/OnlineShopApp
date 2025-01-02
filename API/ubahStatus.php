<?php
require_once "connect.php";

extract($_POST);
if(isset($status, $id )) {
  $tanggal = date('Y-m-d H:i:s');
  $sql = "update statuss set status=?, tanggal=? where orders_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssi", $status, $tanggal, $id);
  $stmt->execute();

  $arr = [];
  if ($stmt->affected_rows){
    $arr = ["hasil"=>"success", "data"=>"Berhasil mengubah status order."];
  }
  else{
    $arr = ["hasil"=> "err","data"=> "Gagal mengubah status order. Eror:".$stmt->affected_rows];
  }
  echo json_encode($arr);
  $stmt->close();
} else{
  echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi semua."]);
}