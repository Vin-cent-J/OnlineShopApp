<?php
require_once "connect.php";

extract($_POST);
if(isset($id, $nama, $foto)) {
  if(isset($fotoSekarang)) {
    unlink("/opt/lampp/htdocs/OnlineShopApp/asset/banner/".$fotoSekarang);
  }
  $sql = "UPDATE banners SET nama=?, foto=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ssi", $nama, $foto, $id);
  $stmt->execute();
  if($stmt->affected_rows){
    echo json_encode(["hasil"=>"success", "data"=>"Berhasil mengubah banner"]);
  }
} else {
  echo json_encode(["hasil"=>"err", "data"=>"Pastikan data sudah terisi"]);
}