<?php
require_once "connect.php";

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

extract($_GET);

if(isset($id)) {
    $sql = "select b.*, m.nama merek, k.nama kategori from barangs b 
    inner join mereks m on b.mereks_id = m.id 
    inner join kategoris k on b.kategoris_id = k.id where b.id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $hasil = $stmt->get_result();
    $arr = [];
    $barang = [];
    if($hasil->num_rows){
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
}
?>
