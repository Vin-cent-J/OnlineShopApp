<?php
require_once "connect.php";
$uploadDir = __DIR__ . '/../asset/'; 

extract($_POST);

if(isset($isBanner) && $isBanner) {
  $uploadDir.='banner/';
}

if(isset($isPembayaran) && $isPembayaran) {
  $uploadDir.='bukti/';
}

if(!isset($nama)){
  http_response_code(400);
  echo json_encode(['hasil' => "err", 'data' => 'Tidak ada nama file.']);
  exit;
}

if (!is_dir($uploadDir)) {
  if (!mkdir($uploadDir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['hasil' => "err", 'data' => 'Failed to create upload directory.']);
    exit;
  }
}

if (!isset($_FILES['file'])) {
  http_response_code(400);
  echo json_encode(['hasil' => "err", 'data' => 'Tidak ada file yang diupload.']);
  exit;
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['hasil' => "err", 'data' => 'Upload gagal.']);
  exit;
}

$maxFileSize = 5 * 1024 * 1024;
if ($file['size'] > $maxFileSize) {
  http_response_code(400);
  echo json_encode(['hasil' => "err", 'data' => 'File melebihi 5MB.']);
  exit;
}

$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedMimeTypes)) {
  http_response_code(400);
  echo json_encode(['hasil' => "err", 'data' => 'Invalid file type. Only JPEG and PNG are allowed.']);
  exit;
}

$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$uniqueName = $nama . '.' . 'jpg';
$destination = $uploadDir . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
  http_response_code(500);
  echo json_encode(['hasil' => "err", 'data' => 'Failed to save the uploaded file.']);
  exit;
}

$host = $_SERVER['HTTP_HOST'];
$assetPath = 'OnlineShopApp/asset/' . $uniqueName;
$assetUrl = "http://" . $host . '/' . $assetPath;

http_response_code(201);
echo json_encode(['hasil' => "success", 'data' => 'File terupload.', 'fileUrl' => $assetUrl]);