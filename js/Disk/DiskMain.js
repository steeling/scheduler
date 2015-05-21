var directions = [];
var trackLists = [];
var startPositions = [];
var correctAnswers = [];
var algorithms = [];
var cumulativeTotals = [];
var currentQuestion= 0;
var seekAnswers = [];

function setSeekAnswer(tracks){ seekAnswers.push(tracks); }

function setTracks(tracks){ trackLists.push(tracks); }

function setDirection(direction){ directions.push(direction); }

function setStartPosition(startPosition){ startPositions.push(startPosition); }

function setCorrectAnswer(answers){ correctAnswers.push(answers); }

function setAlgorithm(algorthm){ algorithms.push(algorthm); }

function setCumulativeTotal(cumulativeTotal){ cumulativeTotals.push(cumulativeTotal); }

function getTracks(){ return trackLists[currentQuestion]; }

function getSeekAnswer(){ return seekAnswers[currentQuestion]; }

function getStartPosition(){ return startPositions[currentQuestion]; }

function getDirection(){ return directions[currentQuestion]; }

function getCorrectAnswer(){ return correctAnswers[currentQuestion]; }

function getAlgorithm(){ return algorithms[currentQuestion]; }

function getCumulativeTotal(){ return cumulativeTotals[currentQuestion]; }

function nextQuestion(){
	if(!canNext())
		return;
	++currentQuestion;
	cleanup();
	addQuestionInfo(trackLists[currentQuestion], directions[currentQuestion],startPositions[currentQuestion],algorithms[currentQuestion]);
	resetGraphics();

	$("#SeekAnswer").val("")
	$("#SeekAnswer").css('color','black');
	$("#checkQuestion")[0].style["display"] = "inline"
	$("#checkmark")[0].style['display'] = "none"
	$("#redx")[0].style['display'] = "none"
	if(currentQuestion == trackLists.length - 1){
		$("#nextQuestion")[0].style["display"] = "none";
	}
	$('#replayHolder').remove();
}

function init(){
	addQuestionInfo(trackLists[currentQuestion], directions[currentQuestion],startPositions[currentQuestion],algorithms[currentQuestion]);

	$("#checkQuestion")[0].style["display"] = "inline"
}
