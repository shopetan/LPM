<?php
	require_once 'lib/validation.php';
	if (!isset($_POST['data']) || !isset($_POST['fname'])) {
		die('error: invalid params.');
	}
	$data = $_POST['data'];
	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);

	$file_name = sanitize_filename($_POST['fname']) . "-" . sha1($data);

	file_put_contents("images/user_icons/" . $file_name, $data);
	echo $file_name;
?>
