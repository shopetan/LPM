<?php
	require_once 'lib/validation.php';
	if (!isset($_POST['data']) || !isset($_POST['fname'])) {
		echo '{"result":"error", "message":"invalid params"}';
		exit;
	}
	$data = $_POST['data'];
	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
  $data = base64_decode($data);
	$img = imagecreatefromstring($data);
	if (!$img) {
		echo '{"result":"error", "message":"invalid image"}';
		exit;
	}

	$file_name = sanitize_filename($_POST['fname']) . "-" . sha1($data);

	if(!imagepng($img, "images/user_icons/" . $file_name)) {
		echo '{"result":"error", "message":"file save error"}';
		exit;
	}
?>
{"result":"success", "file_name":"<?=$file_name?>"}
