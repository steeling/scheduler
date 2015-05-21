function getGantAnswer(){
	guesses[questionCounter] = [];
	var rawGuesses = $(".gant");
	for(var x = 0; x < rawGuesses.length; x++){
		guesses[questionCounter][x] = rawGuesses[x].value.trim().toUpperCase();
		rawGuesses[x].disabled=true
		if(guesses[questionCounter][x].length > 1){
			return -1; //output an error message
		}
	}
}

function checkGantAnswer(){
	var allCorrect = true;
	var gants = $(".gant");
	for(var x = 0; x < guesses[questionCounter].length;x++){
		if(guesses[questionCounter][x] != finalAnswers[questionCounter][x]){
			allCorrect = false;
			gants[x].value = finalAnswers[questionCounter][x]
			gants[x].style['color'] = 'red';
		}else{
			gants[x].style['color'] = '#00FF00';
		}
	}
	if(allCorrect){
		return true;
	}
	return false;
}


function getWaitAnswers(){
	waitGuesses[questionCounter] = [];
	var rawGuesses = $(".wait");
	for(var x = 0; x < rawGuesses.length; x++){
		waitGuesses[questionCounter][x] = parseInt(rawGuesses[x].value)
		rawGuesses[x].disabled=true
	}
}

function checkWaitAnswers(){
	var allCorrect = true;
	var waits = $(".wait");
	for(var x = 0; x < waitGuesses[questionCounter].length;x++){
		if(waitGuesses[questionCounter][x] != waitTimes[questionCounter][x]){
			allCorrect = false;
			waits[x].value = waitTimes[questionCounter][x]
			waits[x].style['color'] = 'red';
		}else{
			waits[x].style['color'] = '#00FF00';
		}
	}
	if(allCorrect){
		return true;
	}
	return false;
}

function checkTurnAroundAnswers(){
	var allCorrect = true;
	var turns = $(".turn_around");
	for(var x = 0; x < turnAroundGuesses[questionCounter].length;x++){
		if(turnAroundGuesses[questionCounter][x] != turnAroundTimes[questionCounter][x]){
			allCorrect = false;
			turns[x].value = turnAroundTimes[questionCounter][x]
			turns[x].style['color'] = 'red';
		}else{
			turns[x].style['color'] = '#00FF00';
		}
	}
	if(allCorrect){
		return true;
	}
	return false;
}

function getTurnAroundAnswers(){
	turnAroundGuesses[questionCounter] = [];
	var rawGuesses = $(".turn_around");
	for(var x = 0; x < rawGuesses.length; x++){
		turnAroundGuesses[questionCounter][x] = parseInt(rawGuesses[x].value)
		rawGuesses[x].disabled=true
	}
}

function checkAnswers(){
	var check = true;
	getGantAnswer();
	checkGantAnswer();
	getWaitAnswers();
	getTurnAroundAnswers();
	check = checkGantAnswer() && check
	check = checkTurnAroundAnswers() && check
	check = checkWaitAnswers() && check
	if(check)
		$("#checkmark")[0].style['display'] = "inline"
	else
		$("#redx")[0].style['display'] = "inline"
		//$('#score')[0].innerHTML = isNaN(parseInt($('#score').innerHTML)) ? 1 : parseInt($('#score').innerHTML) + 1;

}

function calculateTurnAround(){
	var index = turnAroundTimes.length
	turnAroundTimes[index] = new Array();
	for(var x = 0; x < allProcesses[index].length; x++){
		var startCounting = -1, stopCounting = 0;
		for(var y = 0; y < finalAnswers[index].length;y++){
			if(finalAnswers[index][y] == allProcesses[index][x].proc){
				if(startCounting == -1)
					startCounting = y;
				stopCounting = y
			}
		}
		turnAroundTimes[index][x] = 1 + stopCounting - startCounting
	}

}

function calculateWaitTime(){
	var index = waitTimes.length
	waitTimes[index] = new Array();
	for(var x = 0; x < allProcesses[index].length; x++){
		var startCounting = -1, counter = 0, stopCounting = -1, flag = 0;
		for(var y = 0; y < finalAnswers[index].length;y++){
			if(finalAnswers[index][y] == allProcesses[index][x].proc){
				if(startCounting == -1)
					startCounting = y;
				startCounting += counter;
				counter = 0;
			}else {
				if(startCounting != -1)
					counter++;
			}
		}
		waitTimes[index][x] = startCounting
	}
}