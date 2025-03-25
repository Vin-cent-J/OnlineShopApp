<?php
require_once "connect.php";
$id = 4;
extract($_POST);
if(isset($id)) {
  $tgl = date("Y-m-d H:i:s");
  $sql = "delete from banners WHERE `id` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $stmt->execute();

  $arr = [];
  if ($stmt->affected_rows){
      $arr = ["hasil"=>"success", "data"=>"Berhasil menghapus banner."];
  }
  else{
      $arr = ["hasil"=> "err","data"=> "Gagal menghapus banner.", "error"=>$stmt->error];
  }
  echo json_encode($arr);
  $stmt->close();
} else{
  echo json_encode(["hasil"=>"err", "data"=>"Data belum terisi."]);
}