var windowclosed = false;

function set_result_hidden() {
	document.getElementById('viewResultSidebar').setAttribute('collapsed', windowclosed);
	windowclosed = !windowclosed;
}
