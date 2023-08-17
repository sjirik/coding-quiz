var beginQuiz = document.querySelector(".begin button");
var containerOne = document.querySelector(".container_one");
var continueOne = containerOne.querySelector(".buttons .continue");

beginQuiz.onclick = ()=>{
    containerOne.classList.add("activeInfo");
    startTimer(60); 
    startTimerLine(0)
}

continueOne.onclick = ()=>{
    containerOne.classList.remove("activeInfo"); 
    containerTwo.classList.add("activeQuiz"); 
    showQuetions(0);
    queCounter(1); 
}

let timeValue =  60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            var allOptions = answer_list.children.length;
            let correcAns = questions[que_count].answer; 
        }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_button.classList.add("show");
        }
    }

    function startTimerLine(time){
        counterLine = setInterval(timer, 60);
        function timer(){
            time += 1; 
            time_line.style.width = time + "px"; 
            if(time > 549){ 
                clearInterval(counterLine);
        }
    }
}