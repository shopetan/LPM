<?php
	$url = $_POST['url'];
	$file_name = $_POST['file_name'];
	while (is_file($file_name = sha1(mt_rand() . microtime())));

	if (strpos($url, '.') === false && is_file($url)) {
	$data = file_get_contents($url);
	file_put_contents("./images/user_icons/{$file_name}",$data);
	} else {
	echo 'This file is not available';
	}

?>
