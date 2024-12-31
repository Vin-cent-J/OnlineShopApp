<?php
require_once "connect.php";

$sql = "SELECT o.id as id, o.tanggal, status, nama FROM orders o inner join statuss s on o.id = s.orders_id inner join penggunas p on o.penggunas_id = p.id";
$stmt = $conn->prepare($sql);
$stmt->execute();
$hasil = $stmt->get_result();

$data = [];
while ($row = $hasil->fetch_assoc()){
  if(isset($row["id"])){
    $data[] = $row;
    $detail = [];
    
    $id=$row['id'];
  
    $sql2 = "SELECT jumlah, od.harga, nama from detail_orders od inner join barangs b on od.barangs_id = b.id where od.orders_id = ?";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param('i', $id);
    $stmt2->execute();
    $hasil2 = $stmt2->get_result();
  
    while($row = $hasil2->fetch_assoc()){
      $detail[] = $row;
    }
    $data["detail"] = $detail;
  }
}

$arr = ["hasil"=> "success", "data"=> $data];
echo json_encode($arr);
$stmt->close();
