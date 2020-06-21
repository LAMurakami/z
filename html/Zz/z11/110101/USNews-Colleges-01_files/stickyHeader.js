Event.observe(window,'load',function() {
   if ($('stickyHeader') || $$('table.stickyHeader').length) {	
	var table = $$('table.stickyHeader')[0];
	var tableHeight = table.getHeight();
	var tableWidth = table.getWidth();
	
	var headerCells = $$('table.stickyHeader thead th');
	var headerCellHeight = headerCells[0].getHeight();
	
	var no_fixed_support = false;

	if ($('stickyHeader') != null) {
		var stickyHeader = $('stickyHeader');
	}
	else {
		var theadClone = table.select('thead')[0].cloneNode(true);
		var stickyHeader =  new Element('div', {'class':'hide','id':'stickyHeader'}).update('<table></table>');
		$$('table.stickyHeader')[0].parentNode.appendChild(stickyHeader);
		stickyHeader.select('table')[0].appendChild(theadClone);
	}

	if (stickyHeader.getStyle('position') == "absolute") {
		no_fixed_support = true;
	}
	var stickyHeaderCells = stickyHeader.select('th')
	stickyHeader.style.width = tableWidth + 'px';

	for (i=0; i<headerCells.length; i++) {
		var paddingLeft = headerCells[i].getStyle('padding-left').replace(/px/ig,"");
		var paddingRight = headerCells[i].getStyle('padding-right').replace(/px/ig,"");
		var borderLeft = headerCells[i].getStyle('border-left-width').replace(/px/ig,"");
		if (isNaN(borderLeft)) { borderLeft = 0; }
		var borderRight = headerCells[i].getStyle('border-right-width').replace(/px/ig,"");
		if (isNaN(borderRight)) { borderRight = 0; }
		var width = headerCells[i].getWidth();
		var cellWidth = width - paddingLeft - paddingRight - borderLeft - borderRight;
		cellWidth = cellWidth + "px";
		stickyHeaderCells[i].style.width = cellWidth;
	}

	var cutoffTop = table.cumulativeOffset()[1];
	var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;
	Event.observe(window,'scroll',function() {
		var currentPosition = document.viewport.getScrollOffsets()[1];
		if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
			stickyHeader.removeClassName('hide');
			if (no_fixed_support) {
					stickyHeader.style.top = currentPosition + "px";
				}
		}
		else {
			stickyHeader.addClassName('hide');
		}
									   
	});
   }
});

