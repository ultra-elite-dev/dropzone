<?php
$ds = DIRECTORY_SEPARATOR;

$storeFolder = '../uploads';
$targetPath = dirname(__FILE__) . $ds . $storeFolder . $ds;

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    $content = trim(file_get_contents("php://input"));

    $data = json_decode($content, true);

    if ($data['remove']) {
        unlink($targetPath . $data['fileName']);
    }
    return true;
}


if (!empty($_FILES)) {
    $fileCount = count($_FILES['file']['name']);
    for ($i=0; $i<$fileCount; $i++) {
        $tempFile = $_FILES['file']['tmp_name'][$i];
        $targetFile = $targetPath . $_FILES['file']['name'][$i];
        move_uploaded_file($tempFile, $targetFile);
    }
}

