var beginQuiz = document.querySelector(".begin button");
var containerOne = document.querySelector(".container_one");
var continueOne = containerOne.querySelector(".buttons .continue");
var containerTwo = document.querySelector(".container_two");
var results = document.querySelector(".results");
var option_list = document.querySelector(".answer_list");
var time_line = document.querySelector(".time_line");
var timeText = document.querySelector(".time_left");
var timeCount = document.querySelector(".timer .time_sec");

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

let timeV =  60;
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
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_button.classList.add("show"); 
        }
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

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    ques_counter.innerHTML = totalQueCounTag;
}