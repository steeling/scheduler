var questionCounter = 0;

function displayQuestion(processes, func, quantum, tie){

	funcToTextMap = {};
	funcToTextMap[SRJF] = "Shortest Remaining Job First"
	funcToTextMap[roundRobin] = "Round Robin"
	funcToTextMap[SJF] = "Shortest Job First"
	funcToTextMap[priority] = "priority with no preemption"
	funcToTextMap[preemptive] = "priority scheduling with preemption"
	funcToTextMap[FCFS] = "First Come First Serve"

	//console.log(funcToTextMap[func])
	//console.log(func)
	addInfoRows(processes, funcToTextMap[func], quantum, tie)
}



function addQuestions(processes){
	var section = document.getElementById("topRow")
	var row = document.createElement("div")
	row.class="small-12 medium-12 large-12 small-centered medium-centered large-centered columns"
	section.appendChild(row)
	row.style="text-align:center"
	var table = document.createElement("table");
	table.style["margin-top"] = "10px";
	table.style["margin-left"] = "auto";
	table.style["margin-right"] = "auto";
	table.style['border-spacing'] = '0px'
	row.appendChild(table)
	table.style="text-align:center;"
	row=document.createElement("TR");
	section.appendChild(table);
	cells = []
	cell = document.createElement("TH")
	textnodes = [];
	textnode = document.createTextNode("Process")
	cell.appendChild(textnode)
	row.appendChild(cell)

	row2 = document.createElement("TR");
	cell = document.createElement("TH")
	textnode = document.createTextNode("Turn-around time")
	cell.appendChild(textnode)
	row2.appendChild(cell)

	row3 = document.createElement("TR");
	cell = document.createElement("TH")
	textnode = document.createTextNode("Wait time")
	cell.appendChild(textnode)
	row3.appendChild(cell)

	for(var x = 0; x < processes.length; x++){
		cells[x] = document.createElement("TH");
		textnodes[x] = document.createTextNode(processes[x].proc)
		cells[x].appendChild(textnodes[x]);
		row.appendChild(cells[x]);

		cell = document.createElement("TD");
		input = document.createElement("input")
		input.type = "text"
		input.className = 'turn_around'
		cell.appendChild(input)
		row2.appendChild(cell)

		cell = document.createElement("TD");
		input = document.createElement("input")
		input.type = "text"
		input.className = 'wait'
		cell.appendChild(input)
		row3.appendChild(cell)
	}
	table.appendChild(row);
	table.appendChild(row2);
	table.appendChild(row3);


}

function addInfoRows(processes, funcName, quantum, tieBreak){
	var tieBreakText = tieBreak
	if(tieBreak == "burst length")
		tieBreakText = "SJF"

	var section = document.getElementById("table_holder")
	var topRow = document.createElement("div");
	topRow.id = "topRow";
	section.appendChild(topRow)
	var prompt;
	if(funcName == "Round Robin"){
		prompt = document.createTextNode("Fill in the following Gant Chart using " + funcName + " with " +tieBreakText + " ordering" + " and a quantum of " + JSON.stringify(quantum) + ".  A blank space could be a valid answer.")					
	}else{
		prompt = document.createTextNode("Fill in the following Gant Chart using " + funcName + " with " +tieBreakText + " tie breaking" + ". A blank space could be a valid answer.")					
	}
	topRow.appendChild(prompt)
	var table = document.createElement("table");
	table.style["margin-top"] = "10px";
	table.style["margin-left"] = "auto";
	table.style["margin-right"] = "auto";
	table.style['border-spacing'] = '0px'
	row=document.createElement("TR");

	cell1 = document.createElement("TH");
	cell2 = document.createElement("TH");
	cell3 = document.createElement("TH");
	cell4 = document.createElement("TH");
	textnode1=document.createTextNode("Process");
	textnode2=document.createTextNode("Burst Time");
	textnode3=document.createTextNode("Arrival Time");
	textnode4=document.createTextNode("Priority");  
	cell1.appendChild(textnode1);
	cell2.appendChild(textnode2);
	cell3.appendChild(textnode3);
	cell4.appendChild(textnode4);   
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	row.appendChild(cell4);
	table.appendChild(row);  
	for(var x = 0; x < processes.length; x++){
		row=document.createElement("TR");
		cell1 = document.createElement("TD");
		cell2 = document.createElement("TD");
		cell3 = document.createElement("TD");
		cell4 = document.createElement("TD");
		textnode1=document.createTextNode(processes[x].proc);
		textnode2=document.createTextNode(processes[x].burst);
		textnode3=document.createTextNode(processes[x].arrival);
		textnode4=document.createTextNode(processes[x].priority);    
		cell1.appendChild(textnode1);
		cell2.appendChild(textnode2);
		cell3.appendChild(textnode3);
		cell4.appendChild(textnode4);   
		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		table.appendChild(row);
	}
	topRow.appendChild(table);

	gantChart = document.createElement("div");
	gantChart.className = "row GantChart"
	gantChart.style['margin'] = 'auto'
	topRow.appendChild(gantChart)

	labelRow = document.createElement("div");
	labelRow.className = "row tempHolder";
	//labelRow.style['margin'] = 'auto';
	topRow.appendChild(labelRow);

	for(var x = 0; x < finalAnswers[questionCounter].length; x++)
		addGant(x);
	addQuestions(processes)
	//nextQuestion;
	return topRow
}


function nextButtonSetup(){
	$("#checkQuestion").on("click",function(){
		checkAnswers();
		$("#checkQuestion")[0].style["display"] = "none"
	});
	if(allProcesses.length <= 1)
		return
	$("#nextQuestion")[0].style["display"] = "inline"; // display previous button
	button = $("#nextQuestion")[0];
	$("#nextQuestion").on("click",function(){
		//$("#prevQuestion")[0].style["display"] = "inline"; // display previous button
		questionCounter++;
		$('#counter')[0].innerHTML = questionCounter + 1
		$("#topRow").remove();
		$("#checkQuestion")[0].style["display"] = "inline"
		$("#checkmark")[0].style['display'] = "none"
		$("#redx")[0].style['display'] = "none"
		displayQuestion(allProcesses[questionCounter], functions[questionCounter],quantums[questionCounter],tieBreakingStrategies[questionCounter])
		if(questionCounter == allProcesses.length - 1){
			$("#nextQuestion")[0].style["display"] = "none";		}

		if(guesses[questionCounter] != undefined){
			var gants = $('.gant');
			for(var x = 0; x < gants.length; x++){
				gants[x].value = guesses[questionCounter][x]
				gants[x].disabled = true;
			}
		}
	})
	// $("#prevQuestion").on("click",function(){
	// 	$("#nextQuestion")[0].style["display"] = "inline"; // display next button
	// 	questionCounter--;
	// 	$("#topRow").remove();
	// 	displayQuestion(allProcesses[questionCounter], functions[questionCounter],quantums[questionCounter],tieBreakingStrategies[questionCounter])
	// 	$('#counter')[0].innerHTML = questionCounter + 1
	// 	if(questionCounter == 0){
	// 		//remove prev button
	// 		$("#prevQuestion")[0].style["display"] = "none";
	// 		$("#checkWrapper")[0].style['margin-left'] = '33%'

	// 	}
	// 	//repopulate guesses
	// 	if(guesses[questionCounter] != undefined){
	// 		var gants = $('.gant');
	// 		for(var x = 0; x < gants.length; x++){
	// 			gants[x].value = guesses[questionCounter][x]
	// 			gants[x].disabled = true;
	// 		}
	// 	}
	// });




}

function addGant(x){
	gantChart = document.getElementsByClassName("GantChart")[document.getElementsByClassName("GantChart").length - 1];
	//span = document.createElement("span");
	input = document.createElement("input");
	input.type = "text";
	input.className = "gant";
	input.id = "gant" + JSON.stringify(x)
	gantChart.appendChild(input);
	//span.appendChild(document.createTextNode("hello"))
	
	// var newlabel = document.createElement("Label");
	// newlabel.setAttribute("for", "gant" + JSON.stringify(x))
	// newlabel.innerHTML = JSON.stringify(x);
	//  newlabel.className = 'gantnums top'

	//gantChart.appendChild(newlabel)
	return input;
}


function setCorrectAnswer(proc){
	correctAnswer[correctAnswer.length] = proc
}
