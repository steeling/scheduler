  var finalAnswers = new Array()
  var correctAnswer = new Array()
  var tieBreakingStrategies = new Array()
  var quantums = new Array();
  var functions = new Array();
  var allProcesses = new Array();
  var guesses = new Array();
  var turnAroundTimes = new Array();
  var waitTimes = new Array();
  var turnAroundGuesses = new Array();
  var waitGuesses = new Array();

  var numTies = 0;

  function process(proc, burst, arrival, priority){
    this.proc = proc;
    this.burst = parseInt(burst);
    this.arrival = parseInt(arrival);
    this.priority = parseInt(priority);
    this.finished = false;
  }


function tieBreak(arr){//pass multiple return 1
 // console.log(arr)
  //add if multiple possibliities
  numTies++;
  var min = -1;
  var proc, multiple;
  if(tieBreakingStrategies[tieBreakingStrategies.length - 1] == "priority"){
    for(var x = 0; x < arr.length; x++){
      if(arr[x].priority == min)
        multiple = 1
      if(min < 0 || arr[x].priority < min){
        multiple = 0
        proc = arr[x];
        min = arr[x].priority;
      }
    }
  }else if(tieBreakingStrategies[tieBreakingStrategies.length - 1] == "burst length"){
    for(var x = 0; x < arr.length; x++){
      if(arr[x].burst == min)
        multiple = 1
      if(min < 0 || arr[x].burst < min){
        multiple = 0
        proc = arr[x];
        min = arr[x].burst;

      }
    }
  }else if(tieBreakingStrategies[tieBreakingStrategies.length - 1] == "arrival"){
    for(var x = 0; x < arr.length; x++){
      if(arr[x].arrival == min)
        multiple = 1
      if(min < 0 || arr[x].arrival < min){
        multiple = 0
        proc = arr[x];
        min = arr[x].arrival;
      }
    }
  }
  if(multiple == 1){
   // return 1
  }
  return proc;
}

function roundRobin(processes, quantum){ //how does round robin break ties of ties?
  var order = []
  var temp = []
  for(var x = 0; x < processes.length; x++){
    temp[x] = processes[x]
  }
  for(var x = 0; x < processes.length; x++){
    order[x] = tieBreak(temp);
    if(order[x] == 1)
      return
    temp.splice(temp.indexOf(order[x]),1);
  }
  var y = 0;
  var t = 0;
  var counter = 0;
  var flag = false
  while(order.length > 0){
    flag = false
    x = y % order.length;
    while(order[x % order.length].arrival > t){
      if(++x % order.length == y || order.length == 1){
        t++;
        setCorrectAnswer("")
        x = y %order.length;
      }
    }// one is ready to go
    y = x
    for(x = 0; x < quantum; x++){
      t++;
      order[y % order.length].burst -= 1
      setCorrectAnswer(order[y % order.length].proc);
      if(order[y % order.length].burst <= 0){
        order.splice(order.indexOf(order[y % order.length]),1);
        flag = true;
        break;
      }
    }
    if(!flag)
      ++y;
  }
}

function SJF(processes){ //not preemptive
  var time = 0, last;
  for(var x = 0; x < processes.length;x++){
    time += processes[x].burst;
    //time could be longer
  }
  var y;
  var burst;
  var numbreaks = 0;
  var tiebreakers, proc;
  for(x = 0; x <= time || processes.length > 0; x++){
    proc = null;
    burst = -1;
    tiebreakers = new Array();

    for(y = 0; y < processes.length; y++){

      if(processes[y].burst == burst && processes[y].burst <= x)
        tiebreakers[numbreaks++] = processes[y];

      if((burst < 0 || processes[y].burst < burst) && processes[y].arrival <= x){
        burst = processes[y].burst;
        numbreaks = 0;
        proc = processes[y]

      }
    }// went through all procs, need to add proc

    if(numbreaks > 0){

      tiebreakers[numbreaks] = proc;
      proc = tieBreak(tiebreakers);
      if(proc == 1)
        return
    }

    if(proc == null){
      time++
      setCorrectAnswer("");
      continue
    }

    while(proc.burst--){
      x++;
      setCorrectAnswer(proc.proc);
    }

    if(proc.burst <= 0){
      processes.splice(processes.indexOf(proc),1);
    }
  }
}

function SRJF(processes){ 
  var time = 0, last;
  for(var x = 0; x < processes.length;x++){
    time += processes[x].burst;
    //time could be longer
  }
  var y;
  var burst;
  var numbreaks = 0;
  var tiebreakers, proc;
  for(x = 0; x < time; x++){
    proc = null;
    burst = -1;
    tiebreakers = new Array();

    for(y = 0; y < processes.length; y++){

      if(processes[y].burst == burst && processes[y].burst <= x)
        tiebreakers[numbreaks++] = processes[y];

      if((burst < 0 || processes[y].burst < burst) && processes[y].arrival <= x){
        burst = processes[y].burst;
        numbreaks = 0;
        proc = processes[y]

      }
    }// went through all procs, need to add proc

    if(proc == null){
      time++
      setCorrectAnswer("");
      continue
    }
    if(numbreaks > 0){

      tiebreakers[numbreaks] = proc;
      proc = tieBreak(tiebreakers);
      if(proc == 1)
        return
    }



    proc.burst--;

    if(proc.burst <= 0){
      processes.splice(processes.indexOf(proc),1);
    }
    setCorrectAnswer(proc.proc);

  }
}


function priority(processes){ // isnt same as FCFS?
  //cycle through time not process
  var time = 0, last;
  for(var x = 0; x < processes.length;x++){
    time += processes[x].burst;
    //time could be longer
  }
  var y;
  var priority;
  var numbreaks = 0;
  var tiebreakers, proc;
  for(x = 0; x < time || processes.length > 0; x++){
    proc = null;
    priority = -1;
    tiebreakers = new Array();

    for(y = 0; y < processes.length; y++){

      if(processes[y].priority == priority && processes[y].arrival <= x)
        tiebreakers[numbreaks++] = processes[y];

      if((priority < 0 || processes[y].priority < priority) && processes[y].arrival <= x){
        priority = processes[y].priority;
        numbreaks = 0;
        proc = processes[y]

      }
    }// went through all procs, need to add proc

    if(numbreaks > 0){

      tiebreakers[numbreaks] = proc;
      proc = tieBreak(tiebreakers);
      if(proc == 1)
        return
    }

    if(proc == null){
      time++
      setCorrectAnswer("");
      continue
    }

    while(proc.burst--){
      x++;
      setCorrectAnswer(proc.proc);

    }

    if(proc.burst <= 0){
      processes.splice(processes.indexOf(proc),1);
    }
  }
}

function preemptive(processes){//priority goes first
  //cycle through time not process
  var time = 0, last;
  for(var x = 0; x < processes.length;x++){
    time += processes[x].burst;
    //time could be longer
  }
  var y;
  var preemptionOccured = 0
  var priority;
  var numbreaks = 0;
  var tiebreakers, proc;
  var tempProc = null
  for(x = 0; x < time; x++){
    proc = null;
    priority = -1;
    tiebreakers = new Array();

    for(y = 0; y < processes.length; y++){

      if(processes[y].priority == priority && processes[y].arrival <= x)
        tiebreakers[numbreaks++] = processes[y];

      if((priority < 0 || processes[y].priority < priority) && processes[y].arrival <= x){
        priority = processes[y].priority;
        numbreaks = 0;
        proc = processes[y]

      }
    }// went through all procs, need to add proc

    if(numbreaks > 0){

      tiebreakers[numbreaks] = proc;
      proc = tieBreak(tiebreakers);
      if(proc == 1)
        return
    }

    if(proc == null){
      time++
      setCorrectAnswer("");
      continue
    }

    proc.burst--;

    if(proc.burst <= 0){
      processes.splice(processes.indexOf(proc),1);
    }
    if(tempProc != null && tempProc != proc && tempProc.burst != 0)
      preemptionOccured += 1
    setCorrectAnswer(proc.proc);
    tempProc = proc
  }
  if(preemptionOccured <= 1)
    numTies = -100
}

function FCFS(processes){
    timeArr = new Array();
    var proc;
    var min = -1;
    for(var x = 0; x < processes.length; x++){
      for(var y = 0; y < processes.length; y++){
        if((processes[y].arrival < min || min < 0) && timeArr.indexOf(processes[y]) < 0){
          min = processes[y].arrival;
          proc = processes[y]
      }
    }
    timeArr[x] = proc;
    min = -1;
  }
    y = 0;
    countBreaks = 0;
    var tiebreakers= new Array()
    var toReturn;
    var time = 0;
    while(timeArr.length > 0){
      if(timeArr[0].arrival > time){
        time++;
        setCorrectAnswer("")
        continue;
      }
      toReturn = timeArr[0]
      y = 0;
      while(y + 1 < timeArr.length){
        if(timeArr[y].arrival == timeArr[y + 1].arrival){
          tiebreakers[countBreaks++] = timeArr[y];
          y++;
          //duplicate
        }else{
          break;
        }
      }//out of while loop
      if(countBreaks > 0){
        tiebreakers[countBreaks++] = timeArr[y];
        toReturn = tieBreak(tiebreakers);
        if(toReturn == 1)
          return
      }
      countBreaks = 0;
      tiebreakers = new Array();
      for(x = 0; x < toReturn.burst; x++){
        setCorrectAnswer(toReturn.proc);
        time++;
      }
      timeArr.splice(timeArr.indexOf(toReturn),1);

    }
}

function rateMono(){ //priority == period
  //priority = highest period
  order = []
  while(processes.length > 0){//grab order
    min = -1;
    var temp;
    for(var x = 0; x < processes.length; x++){
      if(min == -1 || min < processes[x].priority){
        temp = processes[x];
        min = processes[x].priority;
        processes.splice(processes.indexOf(temp),1);
      }
    }
    order[order.length] = temp;
  }//set order
  time = 0
  procNum = 0
  while(order.length > 0){//process will (at least attempt to) occur at its priority, arrival doesnt exist
    runningProc = order[procNum]
    break;
  }
}

// function checkForPreemption(answers, procs){ //returns the number of times preemption occurred
//   tempProc = answers[0]
//   for(var x = 0; x < answers.length; x++){
//     if(tempProc != answers[x]){
//       for(var y = 0; y < procs.length;y++){
//         if(tempProc == procs[y].proc && )
//           console.log("preempted", tempProc, x)
//       }
//     } 
//     tempProc = answers[x]

//   }
// }




