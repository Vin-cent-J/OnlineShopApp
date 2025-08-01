<?php
require_once "connect.php";

$sql = "SELECT o.id as id, o.tanggal, nama, nomor_hp, o.alamat, bukti_pembayaran FROM orders o left join penggunas p on o.penggunas_id = p.id order by o.id desc";
$stmt = $conn->prepare($sql);
$stmt->execute();
$hasil = $stmt->get_result();

$sql2 = "SELECT jumlah, od.harga, nama barang from detail_orders od inner join barangs b on od.barangs_id = b.id where od.orders_id = ?";
$stmt2 = $conn->prepare($sql2);

$data = [];
while ($row = $hasil->fetch_assoc()){
  if(isset($row["id"])){
    $id=$row['id'];
    $detail = [];

    $stmt2->bind_param('i', $id);
    $stmt2->execute();
    $hasil2 = $stmt2->get_result();
  
    while($detailRow = $hasil2->fetch_assoc()){
      $detail[] = $detailRow;
    }
    $row["detail"] = $detail;

    $sql3 = "select status from statuss where orders_id = ? order by id desc limit 1";
    $stmt3 = $conn->prepare($sql3);
    $stmt3->bind_param("i", $id);
    $stmt3->execute();
    $hasil3 = $stmt3->get_result();

    $status="";
    while($row3 = $hasil3->fetch_assoc()){
      $status=$row3['status'];
    }
    $row["status"] = $status;

    $data[] = $row;
  }
}

$arr = ["hasil"=> "success", "data"=> $data];
echo json_encode($arr);
$stmt->close();
