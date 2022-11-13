<?php 
$thumb = imagecreatefromjpeg('./image.jpg');
$logo = imagecreatefrompng('./watermark.png');

$thumbWidth = imagesx($thumb);
$thumbHeight = imagesy($thumb);


$resizerate = 0.7;
$logoWidth = imagesx($logo) * $resizerate;
$logoHeight = imagesy($logo) * $resizerate;
$logo = imagescale($logo, $logoWidth, $logoHeight);

$result = imagecreatetruecolor($thumbWidth, $thumbHeight);
imagecopyresampled($result, $thumb, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $thumbWidth, $thumbHeight);
imagecopyresampled($result, $logo, $thumbWidth - $logoWidth, 0, 0, 0, $logoWidth, $logoHeight, $logoWidth, $logoHeight);


if(imagepng($result, './result.png')){
    $done = true;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Watermark</title>
</head>
<body>
    <?php if(isset($done) && $done): ?>
        <img src="./result.png" alt="Result">
    <?php endif; ?>
</body>
</html>