<?php
require_once "connect.php";

extract($_POST);

if(isset($penggunas_id)) {
    $sql="select * from orders o left join statuss s on o.id = s.orders_id where o.id=? group by o.id order by s.id desc";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $$penggunas_id);
    $stmt->execute();
    $hasil = $stmt->get_result();
    
    $arr = [];
    $order = [];

    while($row = $hasil->fetch_assoc()) {
        if($row = $hasil->fetch_assoc()){
            while($row = $hasil->fetch_assoc()){

                $sql2="select jumlah, harga from detail_orders where orders_id=?";
                $stmt2 = $conn->prepare($sql2);
                $stmt2->bind_param("i", $$penggunas_id);
                $stmt2->execute();
                $hasil2 = $stmt2->get_result();

                $barang = [];
                while( $row2 = $hasil2->fetch_assoc()){
                    $barang[] = $row2;
                }
                $row["barang"] = $barang;
                $transaksi[] = $row;
            }
            $arr = ["hasil"=>"success", "data"=>$order];
        }
        else{
            $arr = ["hasil"=> "err","data"=> "Transaksi tidak ditermukan."];
        }
    }
    echo json_encode($arr);
    $stmt->close();
    $conn->close();
}