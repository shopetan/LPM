<?php
function is_valid_url($url) {
	return filter_var($url, FILTER_VALIDATE_URL) && preg_match('|^https?+://.+$|', $url);
}

function sanitize_filename($fname) {
	return h(str_replace("\0", "", basename($fname)));
}

function h($text) {
	return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}
?>
