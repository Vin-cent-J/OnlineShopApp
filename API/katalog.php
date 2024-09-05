<?php
require_once "connect.php";

extract($_GET);

$sql = "select b.* from barangs b 
inner join mereks m on b.mereks_id = m.id 
inner join kategoris k on b.kategoris_id = k.id where b.nama like '%?%' and m.nama like ? and k.nama like ? and b.harga >= ? and b.harga <= ?";

if(!isset($cari)){
    $cari = "";
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
    $maxHarga = 10000000;
}



$stmt = $conn->prepare($sql);
$stmt->bind_param("sssdd", $cari, $merek, $kategori, $minHarga, $maxHarga);
$stmt->execute();
$hasil = $stmt->get_result();

$arr = [];
$barang = [];
if($row = $hasil->fetch_assoc()){
    while($row = $hasil->fetch_assoc()){
        $barang[] = $row;
    }
    $arr = ["hasil"=>"success", "data"=>$barang];
}
else{
    $arr = ["hasil"=> "err","data"=> "Barang tidak ditermukan."];
}
echo json_encode($arr);
$stmt->close();
$conn->close();
?>
