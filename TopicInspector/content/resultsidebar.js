var windowclosed = false;

var selected;

function set_result_hidden() {
	document.getElementById('viewResultSidebar').setAttribute('collapsed', windowclosed);
	windowclosed = !windowclosed;
}

function handle_tree_cell_event(aEvent) {

	var tree = document.getElementById("tree1");	

	selected = tree.currentIndex;
}

function refresh_list() {
	var content = document.getElementById("tree_contents");

//alert(content);	

//	content.innerHtml = "<treechildren><treeitem><treerow><treecell label='Bob' id='1'/></treerow></treeitem></treechildren>";
	

//	window.location.reload();
/*
		var treecols=document.createElement(treecols);

		var treecol=document.createElement("treecol");
		treecol.setAttribute("label","我关注的");
		treecol.setAttribute("primary","true");
		treecol.setAttribute("flex","1");
		treecols.appendChild(treecol);
		content.appendChild(treecols);

		var treechildren=document.createElement("treechildren");

		treechildren.setAttribute("context","clipmenu");*/

		var treeitem=document.createElement("treeitem");
		treeitem.setAttribute("container","true");
		treeitem.setAttribute("open","true");

		var treerow=document.createElement("treerow");
		var treecell=document.createElement("treecell");

		var treechildren=document.createElement("treechildren");
		var treeitem2=document.createElement("treeitem");
		var treerow2=document.createElement("treerow");
		var treecell2=document.createElement("treecell");

		treecell.setAttribute("label", "Bob");
		treecell2.setAttribute("label", "123");

		treerow.appendChild(treecell);
		treeitem.appendChild(treerow);

		//sub
		treerow2.appendChild(treecell2);
		treeitem2.appendChild(treerow2);
		treechildren.appendChild(treeitem2);

		treeitem.appendChild(treechildren);
		content.appendChild(treeitem);

}

function delete_selected() {
}


