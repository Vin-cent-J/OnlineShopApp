<?php
require_once "connect.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

extract($_GET);

$sql = "select b.*, m.nama merek, k.nama kategori from barangs b 
inner join mereks m on b.mereks_id = m.id 
inner join kategoris k on b.kategoris_id = k.id 
where b.nama like ? and m.id like ? and k.id like ? and b.harga>=? and b.harga<=?";

if(!isset($cari)){
    $cari = "%";
} else {
    $cari = "%".$cari."%";
}
if(!isset($merek)){
    $merek = "%";
}
if(!isset($kategori)){
    $kategori = "%";
}
if(!isset($minHarga)){
    $minHarga = 0;
}
if(!isset($maxHarga)){
    $maxHarga = 100000000;
}

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssii", $cari, $merek, $kategori, $minHarga, $maxHarga);
$stmt->execute();
$hasil = $stmt->get_result();

$arr = [];
$barang = [];
if($hasil->num_rows){
    while($row = $hasil->fetch_assoc()){
        $barang[] = $row;
    }
}
$arr = ["hasil"=>"success", "data"=>$barang];
echo json_encode($arr);
$stmt->close();
$conn->close();

