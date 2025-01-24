<?php
require_once "connect.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

extract($_POST);

if(isset($penggunas_id)) {
  $sql="select o.* from orders o left join statuss s on o.id = s.orders_id where o.penggunas_id=? group by o.id order by s.id desc";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $penggunas_id); 
  
  $arr = [];
  $order = [];

  if($stmt->execute()){
    $hasil = $stmt->get_result();
    while($row = $hasil->fetch_assoc()){
      $sql2 = "select jumlah, harga from detail_orders where orders_id=?";
      $stmt2 = $conn->prepare($sql2);
      $stmt2->bind_param("i", $row["id"]);
      $stmt2->execute();
      $hasil2 = $stmt2->get_result();

      $barang = [];
      while( $row2 = $hasil2->fetch_assoc()){
          $barang[] = $row2;
      }
      $row["barang"] = $barang;

      $sql3 = "select * from statuss where orders_id = ?";
      $stmt3 = $conn->prepare($sql3);
      $stmt3->bind_param("i", $row["id"]);
      $stmt3->execute();
      $hasil3 = $stmt3->get_result();

      $status = [];
      while($row3 = $hasil3->fetch_assoc()){
        $status[] = $row3;
      }
      $row["status"] = $status;

      $transaksi[] = $row;
    }
    $arr = ["hasil"=>"success", "data"=>$order];
  }
  else{
    $arr = ["hasil"=> "err","data"=> "Tidak ada riwayat transaksi."];
  }
  
  echo json_encode($arr);
  $stmt->close();
  $conn->close();
}