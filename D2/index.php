<?php 

['messages' => $messages] = json_decode(file_get_contents('./data.json'), true); 

$words = explode(" ", implode(' ', array_map(function($m) {
    return preg_replace('/[^a-zA-z ]/', '', strtolower($m['text']));
}, $messages)));

$wordsCount = array_reduce($words, function($obj, $words){
    if(!isset($obj[$words])){
        $obj[$words] = 0;
    }
    $obj[$words]++;
    return $obj;
}, []);

arsort($wordsCount);
$topFive = array_slice($wordsCount, 0, 5);



$sentwords = array_filter($messages, function($m) {
    return $m['from'] === 'Budi';
});

$averagesent = floor(array_reduce(array_map(function($m){
    return strlen($m['text']);
}, $sentwords), fn($acc, $cur) => $acc + $cur) / count($sentwords));


$recievewords = array_filter($messages, function($m) {
    return $m['from'] === 'Bot';
});

$averagereceive = floor(array_reduce(array_map(function($m){
    return strlen($m['text']);
}, $recievewords), fn($acc, $cur) => $acc + $cur) / count($recievewords));

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Analytics</title>
</head>
<body>
    <ul>
        <li>Top five sent words:
            <ul>
                <?php foreach($topFive as $key => $value): ?>
                    <li><?= $key?> (<?= $value?>x)</li>
                <?php endforeach; ?>
            </ul>
        </li>
        <li>Total messages sent: <?= count($sentwords)?></li>
        <li>Total messages receive: <?= count($recievewords)?></li>
        <li>Average character length sent: <?= $averagesent?></li>
        <li>Average character length receive: <?= $averagereceive?></li>
    </ul>
</body>
</html>