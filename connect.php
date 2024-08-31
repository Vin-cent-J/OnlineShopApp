<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "berkatcahayaharapan";

$sql = new mysqli($servername, $username, $password, $dbname);

if ($sql->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
