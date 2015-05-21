function algorithmToText(algorithm){
	switch(algorithm){
		case FCFS:
			return "FCFS";
		case SSTF:
			return "SSTF";
		case SCAN:
			return "SCAN";
		case CSCAN:
			return "C-SCAN";
		case LOOK:
			return "LOOK";
		case CLOOK:
			return "C-LOOK";
	}
}

function get_line_break() {
    return $.support.htmlSerialize ? "\r\n" : '<br />';
}

function addQuestionInfo(tracks, direction, startPosition, algorithm){
	var prompt = $('#TableInfo'), table = $('<table></table>'), row = $('<tr></tr>'), cell;
	
	prompt.append("The following disk tracks arrived in the disk queue in the order they appear. Use  ");
	prompt.append(algorithmToText(algorithm))
	prompt.append(" to determine the order in which they are serviced.")

	prompt.append(get_line_break());
	prompt.append(get_line_break());

	prompt.append("The starting position of the disk head is: ")
	prompt.append(startPosition).css('font-weight,900');
	prompt.append(", and it is moving " + (direction == 1 ? "away from the center." : "toward the center."))
	prompt.append(get_line_break());
	prompt.append(get_line_break());



	//EDIT THIS LINE TO CHANGE THE SEEK TIME FORMULA DISPLAYED
	prompt.append("$$  Seek Time = \\sum TrackDistance $$")
	//EDIT THIS LINE TO CHANGE THE SEEK TIME FORMULA DISPLAYED



	MathJax.Hub.Typeset()
	// MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	table.append(row)
	for(var x = 0;x < tracks.length; x++){ 
		cell = $('<td></td>');
		cell.text(tracks[x])
		row.append(cell)
	}
		prompt.append(table);

		for(x = 0; x < getCorrectAnswer().length; x++){
			prompt.append(createGant(x));
		}
		prompt.append(get_line_break());

}

function printCumulativeTotals(cumulativeTotals){
	var prompt = $('#TableInfo'),table = $('<table></table>'), row = $('<tr></tr>'), cell;
	prompt.append(get_line_break());
	prompt.append(get_line_break());

	prompt.append("Running Seek Time Totals: ")
	table.append(row)

	for(var x = 0;x < cumulativeTotals.length; x++){ 
		cell = $('<td></td>');
		cell.text(cumulativeTotals[x])
		row.append(cell)
	}
		prompt.append(table);

}

function createGant(x){
	input = document.createElement("input");
	input.type = "text";
	input.className = "gant";
	input.id = "gant" + JSON.stringify(x)
	return input
}

function cleanup(){
	$('#TableInfo').children().remove();
	$('#TableInfo').text("");
}