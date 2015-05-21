var algorithms = []
var idToFuncMap = {};
idToFuncMap["SRJFCheck"] = SRJF;
idToFuncMap["roundRobinCheck"] = roundRobin;
idToFuncMap["SJFCheck"] = SJF;
idToFuncMap["PriorityCheck"] = priority;
idToFuncMap["PreemptiveCheck"] = preemptive;
idToFuncMap["FCFS"] = FCFS

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getStartInfo(){
	var checks = $(".algs");
	var numQuestions = parseInt($("#numqs").val())
	$("#errorLabel")[0].innerHTML = ""
	if(isNaN(numQuestions) || numQuestions >= 30 || numQuestions <= 0){
		$("#errorLabel")[0].innerHTML = "Please enter a number less than 30"
		$("#errorLabel")[0].style.color = "red"
	}
	var isOneChecked = false
	for(var x = 0; x < checks.length; x++){
		if(checks[x].checked){
			isOneChecked = true;
			algorithms[algorithms.length] = idToFuncMap[checks[x].id]
		}
	}	
	if(!isOneChecked){
		$("#errorLabel")[0].innerHTML += $("#errorLabel")[0].innerHTML == "" ? "" : "<br />"
		$("#errorLabel")[0].innerHTML += "Please choose at least one scheduling algorithm"
		$("#errorLabel")[0].style.color = "red"
	}
	if(isNaN(numQuestions) || !isOneChecked || numQuestions >= 30 || numQuestions <= 0){
		return false;
	}else{
		algorithms = shuffle(algorithms)
		var y = 0;
		for(x = 0; x < numQuestions; x++){
			if(y < algorithms.length)
				func = algorithms[y++]
			else
				func = algorithms[Math.floor(Math.random() * algorithms.length)] // should i splice it out? //quantum between 2 and 6
			if(func == priority){
				if(Math.random() * 10 < 5){
					func = preemptive;
				}
			}
			func == roundRobin ? generator(4,8,14,20,2,func, Math.floor(Math.random() * 4) + 2) : generator(4,8,14,20,2,func,0);
		}
	}
	return true;
}


window.onload = function(){
	$('#myModal').foundation('reveal', 'open');
	$(".close-reveal-modal")[0].style["display"] = "none";
	$("#Go").on("click", function(){
		if(getStartInfo()){
			$('#counter')[0].innerHTML = 1
			$('#myModal').foundation('reveal', 'close');
			displayQuestion(allProcesses[0], functions[0],quantums[0],tieBreakingStrategies[0])
			nextButtonSetup();
			$("#checkQuestion")[0].style["display"] = "inline";
			$("#checkWrapper")[0].style['margin-left'] = '33%'
		}
	});
}

$(document).ready(function(){
     $('html').click(function(event){
         console.log("mouse click X:"+event.pageX+" Y:"+event.pageY);
     });
 });