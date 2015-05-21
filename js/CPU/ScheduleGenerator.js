funcToTextMap = {};
funcToTextMap[SRJF] = "Shortest Remaining Job First"
funcToTextMap[roundRobin] = "Round Robin"
funcToTextMap[SJF] = "Shortest Job First"
funcToTextMap[priority] = "priority with no preemption"
funcToTextMap[preemptive] = "priority scheduling with preemption"
funcToTextMap[FCFS] = "First Come First Serve"
function generator(minProcs, maxProcs, minTime, maxTime, minTies, func, quantum){//num procs, total time, minTies, arrival, burst, priority
	ties = 0;
	var tieBreakingPossibilities = ["priority", "burst length", "arrival"]
	var tempTieBreaker;
	var temp = 0
	do{
		temp += 1
		tempTieBreaker = tieBreakingPossibilities[Math.floor(Math.random() * tieBreakingPossibilities.length)];
	}while((func == FCFS && tempTieBreaker == "arrival") || ((func == priority || func == preemptive) && tempTieBreaker == "priority") || ((func == SJF || func == SRJF) && tempTieBreaker == "burst length"));
	tieBreakingStrategies[tieBreakingStrategies.length] = tempTieBreaker

	while(ties < minTies){ //decide numProcs, time, total burst time etc
		var processes = [];
		var tempArr = [];
		var myPriority
		letter = 'A';
		correctAnswer = new Array()


		numTies = 0;
		numProcs = Math.floor(Math.random() * (maxProcs - minProcs)) + minProcs;
		time = Math.floor(Math.random() * (minTime - maxTime)) + minTime;
		//total burst ~ time

		burstTimes = genBurst(numProcs,maxTime);
		arrivalTimes = genArrival(numProcs,maxTime);
		var priorityCounter = 0
		var totalTime = 0			

		for(x = 0; x < numProcs; x++){ // put together final processes
			num = Math.floor(Math.random() * (burstTimes.length - 1));
			burst = burstTimes.splice(num,1)[0];
			totalTime += burst
			num = Math.floor(Math.random() * (arrivalTimes.length - 1));
			arrival = arrivalTimes.splice(num,1)[0];

			myPriority = Math.floor(Math.random() * priorityCounter++) + 1

			processes[x] = new process(letter, burst, arrival, myPriority);
			tempArr[x] = new process(letter, burst, arrival, myPriority);
			letter = String.fromCharCode(letter.charCodeAt(letter) + 1);
		}

		//have temporary fields, check for contention
		if(quantum == 0){
			func(tempArr);
		}else{
			var strategy = tieBreakingStrategies[tieBreakingStrategies.length - 1]
			if(strategy == "arrival"){
				for(var x = 0; x < processes.length;x++){
					for(var y = 0; y < processes.length;y++){

						if(processes[x].arrival == processes[y].arrival && x != y){
							processes[x].arrival += 1
							tempArr[x].arrival += 1
							--x
							break
						}
					}
				}
			}

			if(strategy == "priority"){
				for(var x = 0; x < processes.length;x++){
					for(var y = 0; y < processes.length;y++){
						if(processes[x].priority == processes[y].priority && x != y){
							processes[x].priority += 1
							tempArr[x].priority += 1
							--x
							break
						}
					}
				}
			}

			if(strategy == "burst length"){
				for(var x = 0; x < processes.length;x++){
					for(var y = 0; y < processes.length;y++){
						if(processes[x].burst == processes[y].burst && x != y){
							console.log("WTFSDLKFJS:LDKFJ:LKJ")
							processes[x].burst += 1
							tempArr[x].burst += 1
							totalTime += 1
							--x
							break
						}
					}
				}
			}
			while(totalTime > maxTime){
				totalTime -= tempArr[tempArr.length - 1].burst
				tempArr.splice(tempArr.length - 1, 1)
				processes.splice(processes.length - 1, 1)
			}
			func(tempArr,quantum);
			break
		}
		ties = numTies
	}
	finalAnswers[finalAnswers.length] = correctAnswer;
	functions[functions.length] = func
	quantums[quantums.length] = quantum
	allProcesses[allProcesses.length] = processes
	calculateTurnAround()
	calculateWaitTime()
	return processes
}

function genArrival(numProcs, totalBurst){
	arrivalTimes = []
	for(x = 0; x < numProcs; x++){ // create process arrival time
		arrival = Math.floor(Math.random() * Math.random() * (totalBurst - numProcs))
		totalBurst -= arrival / 2;
		arrivalTimes[x] = arrival;
	}
	return arrivalTimes;
}

function genBurst(numProcs, totalBurst){
	burstTimes = []

	for(x = 0; x < numProcs; x++){ // create process burst time
		burst = Math.floor(Math.random() * (totalBurst / numProcs) + totalBurst / numProcs) + 1;
		totalBurst -= burst;
		burstTimes[x] = burst;
	}	
	return burstTimes;
}

