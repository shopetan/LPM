<?php
	require 'lib/validation.php';
	if (!isset($_POST['url']) || !isset($_POST['file_name'])) {
		die('error: invalid params.');
	}
	$url = $_POST['url'];
	if (!is_valid_url($url)) {
		die('error: invalid url.');
	}

	$file_name = sanitize_filename($_POST['file_name']);
	$data = file_get_contents($url);
	$file_name .= "-" . sha1($data);
	file_put_contents("images/user_icons/{$file_name}",$data);
	echo '{"filename":' . $file_name . '}';
?>
