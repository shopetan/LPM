<?php
	$url = $_POST['url'];
	$file_name = $_POST['file_name'];

	$data = file_get_contents($url);
	file_put_contents("./images/user_icons/{$file_name}",$data);
?>
