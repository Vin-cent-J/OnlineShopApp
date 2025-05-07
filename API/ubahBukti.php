<?php
require_once "connect.php";

extract($_POST);
if(isset($id, $bukti)) {
  if(isset($fotoSekarang)) {
    unlink("/opt/lampp/htdocs/OnlineShopApp/asset/bukti/".$fotoSekarang);
  }
  $sql = "UPDATE orders SET bukti_pembayaran=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $bukti, $id);
  $stmt->execute();
  if($stmt->affected_rows){
    echo json_encode(["hasil"=>"success", "data"=>"Berhasil mengubah bukti pembayaran"]);
  }
} else {
  echo json_encode(["hasil"=>"err", "data"=>"Pastikan data sudah terisi"]);
}