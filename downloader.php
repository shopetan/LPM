<?php
	require_once 'lib/validation.php';
	if (!isset($_POST['url']) || !isset($_POST['file_name'])) {
		echo '{"result":"error", "message":"invalid params"}';
		exit;
	}
	$url = $_POST['url'];
	if (!is_valid_url($url)) {
		echo '{"result":"error", "message":"invalid url"}';
		exit;
	}

	$file_name = sanitize_filename($_POST['file_name']);
	$data = file_get_contents($url);
	$img = (@imagecreatefromstring($data));
	if (!$img) {
		echo '{"result":"error", "message":"invalid image"}';
		exit;
	}

	$file_name .= "-" . sha1($data);

	if(!imagepng($img, "images/user_icons/" . $file_name)) {
		echo '{"result":"error", "message":"file save error"}';
		exit;
	}

?>
{"result":"success", "file_name":"<?=$file_name?>"}
