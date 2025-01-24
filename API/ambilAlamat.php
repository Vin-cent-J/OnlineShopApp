<?php
require_once "connect.php";

extract($_POST);
if(isset($penggunas_id)) {
  $sql = "SELECT id, penggunas_id, alamat FROM alamats where penggunas_id=? order by utama desc";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $penggunas_id);

  $alamat = [];
  if($stmt->execute()){
    $hasil = $stmt->get_result();
    while($row = $hasil->fetch_assoc()){
      $alamat[] = $row;
    }
    echo json_encode(["hasil"=>"success", "data"=>$alamat]);
  } else {
    echo json_encode(["hasil"=>"err", "data"=>"Gagal mengambil alamat pengguna"]);
  }
} else {
  echo json_encode(["hasil"=>"err", "data"=>"Masukkan Id pengguna"]);
}