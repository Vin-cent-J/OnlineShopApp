<?php
require_once "connect.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

extract($_GET);

if(!isset($halaman) || $halaman <= 1){
  $halaman = 1;
}
$jumlah = 16;
$mulai = ($halaman - 1) * $jumlah;

$sql1 = "select COUNT(*) total from barangs b 
inner join mereks m on b.mereks_id = m.id 
inner join kategoris k on b.kategoris_id = k.id 
where b.nama like ? and b.tgl_hapus is null ";

$sql = "select b.*, m.nama merek, k.nama kategori from barangs b 
inner join mereks m on b.mereks_id = m.id 
inner join kategoris k on b.kategoris_id = k.id 
where b.nama like ? and b.tgl_hapus is null ";

if(!isset($cari)){
  $cari = "%";
} else {
  $cari = "%".$cari."%";
}

$parameter = [$cari];
$tipe = "s";

if(isset($merek) && $merek != ""){
  $sql .= "and m.id=? ";
  $sql1 .= "and m.id=? ";
  $parameter[] = $merek;
  $tipe
 .= "i";
}
if(isset($kategori) && $kategori != ""){
  $sql .= "and k.id=? ";
  $sql1 .= "and k.id=? ";
  $parameter[] = $kategori;
  $tipe
 .= "i";
}
if(isset($minHarga)){
  $sql .= "and b.harga>=? ";
  $sql1 .= "and b.harga>=? ";
  $parameter[] = $minHarga;
  $tipe
 .= "i";
}
if(isset($maxHarga)){
  $sql .= "and b.harga<=? ";
  $sql1 .= "and b.harga<=? ";
  $parameter[] = $maxHarga;
  $tipe
 .= "i";
}

$stmt1 = $conn->prepare($sql1);
$stmt1->bind_param($tipe, ...$parameter);
if($stmt1->execute()){
  $hasil1 = $stmt1->get_result();
  $row = $hasil1->fetch_assoc();
  $total = $row['total'];
}

$jumlahHalaman = ceil($total / $jumlah);

$sql.="LIMIT ?, ?";
array_push($parameter, $mulai, $jumlah);
$tipe .= "ii";

$stmt = $conn->prepare($sql);
$stmt->bind_param($tipe, ...$parameter);
$stmt->execute();
$hasil = $stmt->get_result();

$arr = [];
$barang = [];
if($hasil->num_rows){
  while($row = $hasil->fetch_assoc()){
    $barang[] = $row;
  }
}
$arr = ["hasil"=>"success", "data"=>$barang, "total"=>$jumlahHalaman];
echo json_encode($arr);
$stmt->close();
$conn->close();

