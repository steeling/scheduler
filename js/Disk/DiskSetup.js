function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getAlgorithm(check){
	switch(check){
		case "FCFSCheck": 
			return FCFS;
		case "SSTFCheck":
			return SSTF;
		case "SCANCheck":
			return SCAN;
		case "CSCANCheck":
			return CSCAN;
		case "LOOKCheck":
			return LOOK;
		case "CLOOKCheck":
			return CLOOK
	}
}

function checkValidInitialization(numQuestions){
	var isOneChecked = false, algorithms = [];
	var errorLabel = $("#errorLabel"), checks = $(".algs");
;
	errorLabel[0].innerHTML = ""
	if(isNaN(numQuestions) || numQuestions >= 30 || numQuestions <= 0){
		errorLabel[0].innerHTML = "Please enter a number less than 30"
		errorLabel[0].style.color = "red"
	}
	for(var x = 0; x < checks.length; x++){
		if(checks[x].checked){
			isOneChecked = true;
			algorithms[algorithms.length] = getAlgorithm(checks[x].id)
		}
	}	
	if(!isOneChecked){
		errorLabel[0].innerHTML += errorLabel[0].innerHTML == "" ? "" : "<br />"
		errorLabel[0].innerHTML += "Please choose at least one scheduling algorithm"
		errorLabel[0].style.color = "red"
	}
	if(isNaN(numQuestions) || !isOneChecked || numQuestions >= 30 || numQuestions <= 0)
		return false
	return algorithms
}


function getStartInfo(){
	var numQuestions = parseInt($("#numqs").val());
	var algorithms = checkValidInitialization(numQuestions);
	var data,tracks, replica = [];
	if(algorithms != false){
		algorithms = shuffle(algorithms)
		var y = 0;
		for(x = 0; x < numQuestions; x++){
			replica = [];
			if(y < algorithms.length)
				func = algorithms[y++]
			else
				func = algorithms[Math.floor(Math.random() * algorithms.length)];
			data = generate(8,15,4000);
			setTracks(data.tracks);
			setStartPosition(data.startPosition);
			setDirection(data.direction);
			setAlgorithm(func)
			tracks = func(data.tracks,data.startPosition,data.direction);
			setSeekAnswer(tracks);

			for(var j = 0, i = 0;j < tracks.length; j++){
				if(tracks[j] == 4000 || tracks[j] == 0)
					continue
				replica[i++] = tracks[j];
				console.log(replica[i-1],tracks[j], j, tracks.length);
			}
			setCorrectAnswer(replica);
		}
		ButtonSetup(numQuestions);
		return true;
	}else

	return false;
}


function ButtonSetup(numQuestions){
	$("#checkQuestion").on("click",function(){
		checkAnswers();
		$("#checkQuestion")[0].style["display"] = "none"
	});
	console.log(numQuestions)
	if(numQuestions <= 1){
		return
	}
	$("#nextQuestion").css("display","inline");
	$("#nextQuestion").on("click",nextQuestion);
}


window.onload = function(){
	$('#myModal').foundation('reveal', 'open');
	//startEnchant();

	$(".close-reveal-modal")[0].style["display"] = "none";

	$("#Go").on("click", function(){
		if(getStartInfo()){
			$('#myModal').foundation('reveal', 'close');
			$("#checkQuestion")[0].style["display"] = "inline";
			$("#checkWrapper")[0].style['margin-left'] = '33%'

			init();
			startEnchant();
		}
	});
}