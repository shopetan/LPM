function writeNavbar(){
	$.ajax({
		url: "navbar.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}
function writeFooter(){
	$.ajax({
		url: "footer.html", //index.htmlの階層が基準
		cache: false,
		async: false,
		success: function(html) {
			document.write(html);
		}
	});
}
