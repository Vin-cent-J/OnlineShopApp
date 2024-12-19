<?php
require_once "connect.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

extract($_GET);

if(!isset($halaman) || $halaman <= 1){
  $halaman = 1;
}
$jumlah = 20;
$mulai = ($halaman - 1) * $jumlah;

$hasil = $conn->query("select COUNT(*) total from barangs where tgl_hapus is null");
$data = $hasil->fetch_assoc();
$total = $data['total'];

$jumlahHalaman = ceil($total / $jumlah);

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

if(isset($merek)){
  $sql .= "and m.id=? ";
  $parameter[] = $merek;
  $tipe
 .= "i";
}
if(isset($kategori)){
  $sql .= "and k.id=? ";
  $parameter[] = $kategori;
  $tipe
 .= "i";
}
if(isset($minHarga)){
  $sql .= "and b.harga>=? ";
  $parameter[] = $minHarga;
  $tipe
 .= "i";
}
if(isset($maxHarga)){
  $sql .= "and b.harga<=? ";
  $parameter[] = $maxHarga;
  $tipe
 .= "i";
}

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

