var next = 0;
function noNext(){
	next = 1;
}

function canNext(){
	return next == 0;
}

function yesNext(){
	next = 0;
}

function checkAnswers(){
	noNext();
	var bool = checkSeekTime(); //to prevent escaping
	checkTrackOrder() && bool? $("#checkmark")[0].style['display'] = "inline" : $("#redx")[0].style['display'] = "inline";
	printCumulativeTotals(getCumulativeTotal());
	animateDisk(0,addStartToAnswers())
	addReplayButton();
}

function checkSeekTime(){
	var seek = seekTime(getCorrectAnswer(),getStartPosition());

	var correct = $("#SeekAnswer").val() == seek;

	!correct ? $("#SeekAnswer").css('color','red') : $("#SeekAnswer").css('color','#00FF00');
	if(!correct) $("#SeekAnswer").val(seek);

}

function addStartToAnswers(){
	var replica = [];
	replica[0] = getStartPosition();
	var original = getSeekAnswer()
	for(var x = 1;x <= original.length; x++){
		replica[x] = original[x-1];
	}
	return replica;
}

function checkTrackOrder(){
	var correct = getCorrectAnswer();
	var guesses = [], gants = $('.gant');
	var allCorrect = true;

	for(var x = 0; x < gants.length;x++){
		if(gants[x].value == correct[x]){
			gants[x].style['color'] = '#00FF00';
		} else{
			gants[x].style['color'] = 'red';
			allCorrect = false;
			gants[x].value = correct[x]
		}

	}
	return allCorrect;

}
function addReplayButton(){
	noNext();
	$("#enchant-stage").append('<div id="replayHolder" style="margin:auto;width:100px"><Button id="replay">Replay</Button></div>');
	$('#replay').on('click', function(){
		resetGraphics();
		animateDisk(0,addStartToAnswers());
	});
}