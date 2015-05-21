var MAXDISTANCE = 4000;

function FCFS(requests, startPosition){
	return requests
}

function SSTF(requests, startPosition){
	var ordered = [], replica = [], min = -1, minIndex;

	for(var x = 0; x < requests.length; x++){
		replica[x] = requests[x];
	}
	for(x = 0; x < replica.length; x++){
		min = -1;
		for(var y = 0;y < replica.length; y++){
			if(min == -1 ||( Math.abs(replica[y] - startPosition) < Math.abs(min - startPosition) && min != -1)){
				min = replica[y];
				minIndex = y;
			}
		}
		startPosition = replica[minIndex]
		ordered[x] = replica[minIndex];
		replica[minIndex] = MAXDISTANCE * 3;
		min = -1;
	}
	return ordered
}

function SCAN(requests, startPosition,direction){
	var ordered = [];
	var replica = [];

	for(var x = 0; x < requests.length; x++){
		replica[x] = requests[x];
	}
	if(direction == 1){//moving up

		replica.sort(function(a, b){return a-b});
		for(x = 0; replica[x] < startPosition; x++); //x now is equal to the index of the first item larger than start 
		ordered = replica.slice(x);
		ordered.push(MAXDISTANCE);
		ordered = ordered.concat(replica.slice(0,x).sort(function(a, b){return b-a}));

	}else{
		replica.sort(function(a, b){return b-a});
		for(x = 0; replica[x] > startPosition; x++); //x now is equal to the index of the first item larger than start 
		ordered = replica.slice(x);
		ordered.push(0);
		ordered = ordered.concat(replica.slice(0,x).sort(function(a, b){return a-b}));
	}
	return ordered
}

function CSCAN(requests,startPosition,direction){
	var ordered = [];
	var replica = [];

	for(var x = 0; x < requests.length; x++){
		replica[x] = requests[x];
	}

	replica.sort(function(a, b){return a-b});
	if(direction == 1){//moving up

		replica.sort(function(a, b){return a-b});
		for(x = 0; replica[x] < startPosition; x++); //x now is equal to the index of the first item larger than start 
		ordered = replica.slice(x);
		ordered.push(MAXDISTANCE);
		ordered.push(0)
		ordered = ordered.concat(replica.slice(0,x));

	}else{
		ordered.push(0);
		ordered = ordered.concat(replica);
	}
	return ordered
}

function LOOK(requests,startPosition, direction){
	var ordered = [];
	var replica = [];

	for(var x = 0; x < requests.length; x++){
		replica[x] = requests[x];
	}
	if(direction == 1){//moving up

		replica.sort(function(a, b){return a-b});
		for(x = 0; replica[x] < startPosition; x++); //x now is equal to the index of the first item larger than start 
		ordered = replica.slice(x);
		ordered = ordered.concat(replica.slice(0,x).sort(function(a, b){return b-a}));

	}else{
		replica.sort(function(a, b){return b-a});
		for(x = 0; replica[x] > startPosition; x++); //x now is equal to the index of the first item larger than start 
		ordered = replica.slice(x);
		ordered = ordered.concat(replica.slice(0,x).sort(function(a, b){return a-b}));
	}
	return ordered
}

function CLOOK(requests,startPosition, direction){
	var ordered = [];
	var replica = [];

	for(var x = 0; x < requests.length; x++){
		replica[x] = requests[x];
	}
	replica.sort(function(a, b){return a-b});

	if(direction == 1){//moving up
		for(x = 0; replica[x] < startPosition; x++); //x now is equal to the index of the first item larger than start 
		ordered = replica.slice(x);
		ordered = ordered.concat(replica.slice(0,x));

	}else{
		ordered = ordered.concat(replica);
	}
	return ordered
}

function seekTime(ordered, startPosition){
	var seekTime = 0;
	var cumulativeTotal = [];
	var prev = startPosition
	var curSeek
	for(var x = 0; x < ordered.length; x++){
		curSeek = Math.abs(prev - ordered[x])
		//EDIT THIS LINE TO CHANGE THE SEEK TIME FORMULA CALCULATIONS
		seekTime += curSeek
		//EDIT THIS LINE TO CHANGE THE SEEK TIME FORMULA DISPLAYED


		cumulativeTotal[x] = seekTime;

		prev = ordered[x]
	}
	setCumulativeTotal(cumulativeTotal);
	return seekTime;
}
